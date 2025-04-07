"use client";
import { SelectChangeEvent } from "@mui/material/Select";
import { useRef, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/joy";
import { QuestionCreate } from "./QuestionCreate";
import { createSurvey } from "@/actions/actions";
import { DebounceInput } from "@/app/_reusable/debounce-input";

export type QuestionType = "radio" | "checkbox" | "text";
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

  const [errorMessage, setErrorMessage] = useState("");
  const timerId = useRef(undefined);
  const setError = (msg) => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => setErrorMessage(""), 1500);
    setErrorMessage(msg);
  };
  const addVopros = () => {
    setQestionsArr((prev) => [
      ...prev,
      {
        type: "text",
        answers: [
          {
            answer: "Ответ пользователя",
            checked: false,
          },
        ],
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
      const isPrevText = prev[questionIndex].type === "text";
      if (event.target.value === "text") {
        return [
          ...prev.slice(0, questionIndex),
          {
            ...prev[questionIndex],
            type: event.target.value as QuestionType,
            answers: [
              {
                answer: "Ответ пользователя",
                checked: false,
              },
            ],
          },
          ...prev.slice(questionIndex + 1),
        ];
      }
      if (isPrevText) {
        prev[questionIndex].answers = [];
      }
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
    if (!oprosName.trim()) return setError("Задайте название опроса");
    if (!questionsArr.length) return setError("Создайте вопрос");

    for (let i = 0; i < questionsArr.length; i++) {
      const question = questionsArr[i];
      if (!question.question.trim()) {
        return setError(`Задайте название вопроса №${i + 1}`);
      }
      switch (question.type) {
        case "checkbox":
        case "radio": {
          if (!question.answers.length || question.answers.length < 2)
            return setError(`Задайте от 2х ответов на вопрос №${i + 1}`);
          let checked = false;
          for (let j = 0; j < question.answers.length; j++) {
            const answer = question.answers[j];
            if (!answer.answer) {
              return setError(`Задайте название ответа на вопрос №${i + 1}`);
            }
            if (answer.checked) checked = true;
          }
          if (!checked) {
            if (question.type === "checkbox")
              return setError(`Отметьте верными ответы на вопрос №${i + 1}`);
            if (question.type === "radio")
              return setError(`Отметьте верный ответ на вопрос №${i + 1}`);
          }
          break;
        }
      }
    }
    await createSurvey(questionsArr, oprosName);
  };
  const [loading, setLoading] = useState(false);
  const createOprosWrapper = () => {
    setLoading(true);
    createOpros().finally(() => setLoading(false));
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
        <Button onClick={createOprosWrapper} sx={{ mt: 4 }} disabled={loading}>
          Создать опрос
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={!!errorMessage}
        >
          <Alert sx={{ width: "100%" }} variant="soft" color={"danger"}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Page;
