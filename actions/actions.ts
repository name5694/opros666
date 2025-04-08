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
  redirect("/finished");
}

export async function createPayment({
  MNT_TRANSACTION_ID,
  MNT_CURRENCY_CODE,
  MNT_AMOUNT,
  MNT_TEST_MODE,
  MNT_SUBSCRIBER_ID,
  userId,
  returnOprosId
}) {
  const payment = await prisma.payment.create({
    data: {
      MNT_TRANSACTION_ID,
      MNT_CURRENCY_CODE,
      MNT_AMOUNT,
      MNT_TEST_MODE,
      MNT_SUBSCRIBER_ID,
      lifetime: false,
      userId,
      returnOprosId
    },
  });
  return payment;
}

export async function confirmPayment(MNT_TRANSACTION_ID: string) {
    const payment = await prisma.payment.findUnique({
      where: { MNT_TRANSACTION_ID },
    });

    // Если запись не найдена, генерируем ошибку
    if (!payment) {
      throw new Error(`Платеж с ID ${MNT_TRANSACTION_ID} не найден`);
    }

    // Если запись найдена, обновляем ее
    const paidUntil = new Date();
    paidUntil.setDate(paidUntil.getDate() + 30);
    if (payment.lifetime) {
      paidUntil.setFullYear(2999, 0, 1);
    }    

    const updatedPayment = await prisma.payment.update({
      where: { MNT_TRANSACTION_ID },
      data: {
        paid: true,
        paidUntil,
      },
    });

    if (updatedPayment?.returnOprosId) {
      // const surveys = prisma.opros.findMany({
      //   where: userId
      // });
      redirect(`/result/${updatedPayment.returnOprosId}`);
    }

    return updatedPayment;

}

export async function getUserSubscriptionInfo(userId) {
  const payments = await prisma.payment.findMany({
    where: {
      userId,
      paid: true,
    },
    orderBy: {
      paidUntil: "desc",
    },
    take: 1, // Берем только одну запись
  });

  const payment = payments[0];
  if (!payment) return "no-pro";
  if (payment.lifetime) return "Пожизненно";

  return `До ${payment.paidUntil.toLocaleDateString("ru-RU")}`;

}
