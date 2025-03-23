"use client";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Button } from "@mui/joy";
import { QuestionCreate } from "./QuestionCreate";
import { createSurvey } from "@/app/actions/actions";
import { DebounceInput } from "@/reusable/debounce-input";

export type QuestionType = "radio" | "checkbox";
export interface IAnswer {
  answer: string;
  checked: boolean;
}

export interface IQuestion {
  type: QuestionType;
  answers: IAnswer[];
  question: string;
  // checked: number | null;
}

const Page = () => {
  const [questionsArr, setQestionsArr] = useState<IQuestion[]>([]);
  const [oprosName, setOprosName] = useState("");
  const addVopros = () => {
    setQestionsArr((prev) => [
      ...prev,
      {
        type: "radio",
        answers: [],
        question: "",
        // checked: null,
      },
    ]);
  };

  const changeAnswers = (questionIndex: number, newArray: IAnswer[]) => {
    if (!(questionIndex < questionsArr.length)) return;

    setQestionsArr((prev) => [
      ...prev.slice(0, questionIndex),
      {
        ...prev[questionIndex],
        answers: newArray,
      },
      ...prev.slice(questionIndex + 1),
    ]);
  };
  const changeQuestionName = (questionIndex: number, name: string) => {
    if (!(questionIndex < questionsArr.length)) return;

    setQestionsArr((prev) => [
      ...prev.slice(0, questionIndex),
      {
        ...prev[questionIndex],
        question: name,
      },
      ...prev.slice(questionIndex + 1),
    ]);
  };
  const handleChangeType = (
    questionIndex: number,
    event: SelectChangeEvent
  ) => {
    setQestionsArr((prev) => {
      if (event.target.value === "checkbox") {
        return [
          ...prev.slice(0, questionIndex),
          {
            ...prev[questionIndex],
            type: event.target.value as QuestionType,
          },
          ...prev.slice(questionIndex + 1),
        ];
      }
      const question = questionsArr[questionIndex];
      if (!question) return prev;
      const checkedCount = question.answers.reduce(
        (acc, cur) => acc + +cur.checked,
        0
      );
      if (checkedCount >= 2) {
        question.answers.map((item) => (item.checked = false));
      }

      return [
        ...prev.slice(0, questionIndex),
        {
          ...prev[questionIndex],
          type: event.target.value as QuestionType,
        },
        ...prev.slice(questionIndex + 1),
      ];
    });
  };
  const handleSelectRadioAnswer = (
    questionIndex: number,
    answerIndex: number
  ) => {
    setQestionsArr((prev) => {
      const question = prev[questionIndex];
      question.answers.forEach(
        (item, index) => (item.checked = index === answerIndex)
      );
      return [
        ...prev.slice(0, questionIndex),
        question,
        ...prev.slice(questionIndex + 1),
      ];
    });
  };
  const handleSelectCheckboxAnswer = (
    questionIndex: number,
    answerIndex: number
  ) => {
    setQestionsArr((prev) => {
      const question = prev[questionIndex];
      question.answers[answerIndex].checked =
        !question.answers[answerIndex].checked;
      return [
        ...prev.slice(0, questionIndex),
        question,
        ...prev.slice(questionIndex + 1),
      ];
    });
  };

  const createOpros = async () => {
    //server send event
    await createSurvey(questionsArr, oprosName);

    // if (result.id) {
    //   redirect(`/lets-go/${result.id}`);
    // }
  };
  const changeOprosName = async (value: string) => {
    setOprosName(value);
  };

  return (
    <div>
      <div className="numberWrapper">
        <DebounceInput
          placeholder="Название опроса"
          handleDebounce={changeOprosName}
          debounceTimeout={300}
        />
        {/* <MyNumberInput min={0} /> */}
        {questionsArr.map((item, index) => (
          <QuestionCreate
            question={item}
            key={Math.random()}
            changeAnswers={(newArray: IAnswer[]) =>
              changeAnswers(index, newArray)
            }
            handleChangeType={(type: SelectChangeEvent) =>
              handleChangeType(index, type)
            }
            handleSelectRadioAnswer={(answerIndex: number) =>
              handleSelectRadioAnswer(index, answerIndex)
            }
            handleSelectCheckboxAnswer={(answerIndex: number) =>
              handleSelectCheckboxAnswer(index, answerIndex)
            }
            changeQuestionName={(name: string) =>
              changeQuestionName(index, name)
            }
          />
        ))}

        <Button onClick={addVopros} sx={{ mt: 4 }}>
          Добавить вопрос
        </Button>
        <Button onClick={createOpros} sx={{ mt: 4 }}>
          Создать опрос
        </Button>
      </div>
    </div>
  );
};

export default Page;
