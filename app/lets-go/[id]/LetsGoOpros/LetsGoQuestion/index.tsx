"use client";
import React, { FC } from "react";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import { Checkbox, Typography } from "@mui/joy";
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
const LetsGoQuestion: FC<{
  question: TQuestion;
  questionIndex: number;
  userAnswers: TUserAnswers;
  setUserAnswers: React.Dispatch<React.SetStateAction<TUserAnswers>>;
}> = ({ question, questionIndex, userAnswers, setUserAnswers }) => {
  const changeRadio = (questionId: string, answerId: string) => {
    setUserAnswers((prev) => {
      return [
        ...prev.slice(0, questionIndex),
        {
          questionId,
          answers: new Set([answerId]),
        },
        ...prev.slice(questionIndex + 1),
      ];
    });
  };
  const changCheckbox = (questionId: string, answerId: string) => {
    setUserAnswers((prev) => {
      const userAnswer = userAnswers[questionIndex] ?? {
        questionId,
        answers: new Set(),
      };
      userAnswer.questionId = questionId;
      if (userAnswer.answers.has(answerId)) userAnswer.answers.delete(answerId);
      else userAnswer.answers.add(answerId);
      return [
        ...prev.slice(0, questionIndex),
        userAnswer,
        ...prev.slice(questionIndex + 1),
      ];
    });
  };
  return (
    <div>
      <p>
        {questionIndex + 1}. {question.question}
      </p>

      <RadioGroup
        aria-labelledby="storage-label"
        defaultValue="512GB"
        size="lg"
        sx={{ gap: 1.5 }}
      >
        {question.answers?.map((item, index) => {
          const { answer: value, id: answerId, questionId } = item;
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
              {question.type === "radio" && (
                <Radio
                  variant="solid"
                  checked={!!userAnswers[questionIndex]?.answers?.has(answerId)}
                  overlay
                  onClick={() => changeRadio(questionId, answerId)}
                />
              )}
              {question.type === "checkbox" && (
                <Checkbox
                  variant="solid"
                  overlay
                  checked={!!userAnswers[questionIndex]?.answers?.has(answerId)}
                  onClick={() => changCheckbox(questionId, answerId)}
                />
              )}

              {/* <Input value={value} disabled variant="plain" /> */}
              <Typography
                sx={{
                  flex: 1,
                  borderBottom: "1px solid gray",
                  pl: 0.5,
                  pb: 0.5,
                }}
              >
                {index + 1}) {value}
              </Typography>
            </Sheet>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default LetsGoQuestion;
