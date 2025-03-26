import { LinkClient } from "@/app/created/[resultId]/LinkClient";
import { prisma } from "@/prisma/db";
import React from "react";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ resultId: string }> }) => {
  const { resultId } = await params;
  const opros = await prisma.opros.findFirst({
    where: {
      resultId,
    },
  });

  if (!opros) {
    notFound();
  }

  return (
    <div>
      <h1 className="leading-8">
        Опрос{" "}
        <span className="p-1 border-red-300 border rounded-md leading-3">
          {opros.name}
        </span>{" "}
        создан!
      </h1>
      <p className="mt-4">Прохождение по ссылке:</p>
      <LinkClient subLink={`lets-go/${opros.id}`} />

      <p className="mt-4">Результаты по ссылке:</p>
      <LinkClient subLink={`result/${opros.resultId}`} />
    </div>
  );
};

export default Page;
