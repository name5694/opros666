"use server";

import { prisma } from "@/prisma/db";
import React from "react";

export const Abob = async () => {
  const opros = await prisma.opros.findMany({
    include: {
      questions: {
        include: {
          answers: true, // Включаем ответы для каждого вопроса
          // Если есть другие вложенные связи для вопросов, их также можно добавить
        },
      },
    },
  });
  console.log(opros);

  return <div>{opros.length} опросов создано</div>;
};
