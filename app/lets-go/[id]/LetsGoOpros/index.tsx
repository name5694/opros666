"use client";
import React, { FC, useRef, useState } from "react";
import { finishAnsweringSurvey } from "@/actions/actions";
import LetsGoQuestion from "@/app/lets-go/[id]/LetsGoOpros/LetsGoQuestion";
import { Alert, Button, Snackbar } from "@mui/joy";
import { LetsGoTextQuestion } from "@/app/lets-go/[id]/LetsGoOpros/LetsGoTextQuestion";

type TOpros = {
  questions: ({
    answers: {
      id: string;
      answer: string;
      checked: boolean;
      questionId: string;
    }[];
  } & {
    question: string;
    id: string;
    type: string;
    oprosId: string;
  })[];
} & {
  name: string;
  id: string;
  resultId: string;
  createdAt: Date;
};

export type TUserAnswers = {
  questionId: string;
  answers: Set<string>;
  text?: string;
  type: string;
}[];

const LetsGoOpros: FC<{ opros: TOpros }> = ({ opros }) => {
  const [userAnswers, setUserAnswers] = useState<TUserAnswers>(
    new Array(opros.questions.length).fill(null).map((_, index) => {
      const question = opros.questions[index];
      const type = question.type;
      const answers = new Set<string>();
      if (type === "text") {
        answers.add(question.answers[0].id);
      }
      return {
        questionId: question.id,
        answers,
        type,
      };
    })
  );
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const timerId = useRef<ReturnType<typeof setTimeout>>(undefined);

  function validateSurvey(userAnswers: TUserAnswers) {
    let isValid = true;

    for (const answer of userAnswers) {
      if (answer.type === "text") {
        if (!answer.text) {
          isValid = false;
          break;
        }
      } else {
        if (!answer.answers.size) {
          isValid = false;
          break;
        }
      }
    }
    if (!isValid) {
      setIsSnackOpen(true);
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => setIsSnackOpen(false), 2000);
    }
    return isValid;
  }
  function addTextToUserAnswers(answers: TUserAnswers) {
    for (const answer of answers) {
      const ui = document.getElementById(
        `question-${answer.questionId}`
      ) as HTMLInputElement;
      const value = ui?.value?.trim() ?? "";
      answer.text = value;
    }
    return answers;
  }
  return (
    <div>
      {opros.questions.map((item, index) => {
        if (item.type === "text") {
          return (
            <LetsGoTextQuestion
              question={item}
              key={index}
              questionIndex={index}
              userAnswers={userAnswers}
              setUserAnswers={setUserAnswers}
            />
          );
        }
        return (
          <LetsGoQuestion
            question={item}
            key={index}
            questionIndex={index}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
          />
        );
      })}
      <div className="mt-8">
        <Button
          onClick={() => {
            const userAnswersWithText = addTextToUserAnswers(userAnswers);
            const isValid = validateSurvey(userAnswersWithText);
            if (isValid) {
              finishAnsweringSurvey(opros.id, userAnswersWithText);
            }
          }}
        >
          Завершить опрос
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackOpen}
      >
        <Alert sx={{ width: "100%" }} variant="soft" color={"danger"}>
          Заполните все вопросы
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LetsGoOpros;
