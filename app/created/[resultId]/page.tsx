import { LinkClient } from "@/app/created/[resultId]/LinkClient";
import { prisma } from "@/prisma/db";
import React from "react";
import { headers } from "next/headers";

const Page = async ({ params }: { params: Promise<{ resultId: string }> }) => {
  const { resultId } = await params;
  const headersList = await headers();
  const referer = headersList.get("referer");
  const origin = new URL(referer as string).origin;
  const opros = await prisma.opros.findFirst({
    where: {
      resultId,
    },
  });

  if (!opros) {
    return <p>Опрос не найден</p>;
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
      <LinkClient link={`${origin}/lets-go/${opros.id}`} />

      <p className="mt-4">Результаты по ссылке:</p>
      <LinkClient link={`${origin}/result/${opros.resultId}`} />
    </div>
  );
};

export default Page;
