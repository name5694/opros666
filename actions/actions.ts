"use server";

import { IQuestion } from "@/app/create/page";
import { TUserAnswers } from "@/app/lets-go/[id]/LetsGoOpros";
import { prisma } from "@/prisma/db";
import { redirect } from "next/navigation";

export async function createSurvey(questions: IQuestion[], name: string) {
  const survey = await prisma.opros.create({
    data: {
      name, // Название опроса
      questions: {
        create: questions.map(question => ({
          question: question.question,
          type: question.type,
          answers: {
            create: question.answers.map(answer => ({
              answer: answer.answer,
              checked: answer.checked
            }))
          }
        })),
      }
    }
  });
  redirect(`/created/${survey.resultId}`);
  
  return survey;
}

export async function finishAnsweringSurvey(oprosId: string, userAnswers: TUserAnswers) {
  console.log(oprosId, userAnswers);
  const survey = await prisma.userOpros.create({
    data: {
      templateOprosId: oprosId,
      userAnswers: {
        create: userAnswers.map(answers => ({
          questionId: answers.questionId,
          userSubAnswers: {
            create: Array.from(answers.answers).map(answer => ({
              answerId: answer,
              text: answers.text
            }))
          }
        })),
      }
    }
  });
  console.log(survey);
  redirect("/finished");
}
