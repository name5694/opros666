"use client";
import React, { FC, useRef, useState } from "react";
import { finishAnsweringSurvey } from "@/app/actions/actions";
import LetsGoQuestion from "@/app/lets-go/[id]/LetsGoOpros/LetsGoQuestion";
import { Alert, Button, Snackbar } from "@mui/joy";

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
}[];

const LetsGoOpros: FC<{ opros: TOpros }> = ({ opros }) => {
  const [userAnswers, setUserAnswers] = useState<TUserAnswers>(
    new Array(opros.questions.length).fill(null).map(() => ({
      questionId: "",
      answers: new Set<string>(),
    }))
  );
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const timerId = useRef<ReturnType<typeof setTimeout>>(undefined);

  function validateSurvey(fn: () => void) {
    let isValid = true;
    console.log(userAnswers);

    if (
      userAnswers.filter((item) => item.answers.size > 0).length !==
      opros.questions.length
    )
      isValid = false;
    if (isValid) {
      fn();
    } else {
      setIsSnackOpen(true);
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => setIsSnackOpen(false), 2000);
    }
  }
  return (
    <div>
      {opros.questions.map((item, index) => {
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
      <Button
        onClick={() =>
          validateSurvey(() => finishAnsweringSurvey(opros.id, userAnswers))
        }
      >
        Завершить опрос
      </Button>
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
