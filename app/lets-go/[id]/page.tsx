import LetsGoOpros from "@/app/lets-go/[id]/LetsGoOpros";

import { prisma } from "@/prisma/db";
import { notFound } from "next/navigation";

import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const opros = await prisma.opros.findUnique({
    where: {
      id,
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });

  if (!opros) {
    notFound();
  }
  return (
    <div>
      <p>Прохождение опроса</p>
      <h1 className="text-4xl">{opros.name}</h1>

      <LetsGoOpros opros={opros} />
    </div>
  );
};

export default Page;
