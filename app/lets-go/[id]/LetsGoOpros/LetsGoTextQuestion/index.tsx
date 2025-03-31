"use client";
import React, { FC } from "react";
import Sheet from "@mui/joy/Sheet";
import { Input } from "@mui/joy";
import { TUserAnswers } from "@/app/lets-go/[id]/LetsGoOpros";

type TQuestion = {
  answers: {
    checked: boolean;
    id: string;
    answer: string;
    questionId: string;
  }[];
} & {
  question: string;
  id: string;
  type: string;
  oprosId: string;
};
export const LetsGoTextQuestion: FC<{
  question: TQuestion;
  questionIndex: number;
  userAnswers: TUserAnswers;
  setUserAnswers: React.Dispatch<React.SetStateAction<TUserAnswers>>;
}> = ({ question, questionIndex, userAnswers }) => {
  return (
    <div>
      <p>
        {questionIndex + 1}. {question.question}
      </p>

      {question.answers?.map((item, index) => {
        const { answer: value, id: answerId, questionId } = item;
        const text = userAnswers?.[0].answers[answerId]?.text;
        return (
          <Sheet
            key={`${value} + ${index}`}
            sx={{
              p: 2,
              borderRadius: "md",
              boxShadow: "sm",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Input
              value={text}
              variant="solid"
              id={`question-${questionId}`}
              placeholder="Ввеедите ответ"
            />
          </Sheet>
        );
      })}
    </div>
  );
};
