import { prisma } from "@/prisma/db";
import { cn } from "@/utils";
import { Checkbox, Radio } from "@mui/joy";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: resultId } = await params;

  const opros = await prisma.opros.findFirst({
    where: {
      resultId,
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
      userOpros: {
        include: {
          userAnswers: {
            include: {
              userSubAnswers: true,
            },
          },
        },
      },
    },
  });

  if (!opros) {
    return <p>Опрос не найден</p>;
  }

  const questionTemplates = opros.questions;

  const rows = opros.userOpros.map(
    (item: (typeof opros.userOpros)[0]) => item.userAnswers
  );

  const someSit = rows.map((row) => {
    return row.map((col) => {
      const templateQuestion = questionTemplates.find(
        (item) => item.id === col.questionId
      );
      const userAnswersIds = col.userSubAnswers.map((item) => item.answerId);
      const answersWithAreRight = userAnswersIds.map((answerId) => {
        const answer = templateQuestion?.answers.find(
          (item) => item.id === answerId
        );

        return {
          answer: answer?.answer,
          right: answer?.checked,
          answerId: answer?.id,
          checked: true,
        };
      });
      templateQuestion?.answers.forEach((templateAnswer) => {
        if (
          templateAnswer.checked &&
          !answersWithAreRight.some(
            (item) => item.answerId === templateAnswer.id
          )
        ) {
          answersWithAreRight.push({
            answer: templateAnswer?.answer,
            right: true,
            answerId: templateAnswer?.id,
            checked: false,
          });
        }
      });

      return answersWithAreRight;
    });
  });

  const rowsResult = someSit.map((row) => {
    const max = row.length;
    const cur = row.filter((col) =>
      col.every((ans) => !ans.right || (ans.right && ans.checked))
    ).length;

    return `${cur} / ${max}`;
  });
  return (
    <div>
      <p>
        <span className="bg-lime-300 p-1">Красным</span> выделены неверные
        ответы
      </p>
      <p>
        <span className="bg-red-300 p-1">Зеленым</span> выделены верные ответы
      </p>
      <p>
        <span className="bg-orange-300 p-1">Оранжевым</span> выделены верные
        ответы, которые пользователь не отметил
      </p>
      <table>
        <thead>
          <tr>
            <th className="border border-zinc-600">№</th>
            {questionTemplates.map((item, i) => (
              <th key={i} className="border border-zinc-600">
                {item.question}
              </th>
            ))}
            <th className="border border-zinc-600">Результат</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4 border border-zinc-600">
              Ответы при
              <br />
              создании
            </td>
            {questionTemplates.map((item, indexCol) => {
              switch (item.type) {
                case "radio":
                  return (
                    <td key={indexCol} className="p-4 border border-zinc-600">
                      {item.answers.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Radio checked={item.checked} variant="soft" />
                          <p
                            className={`${item.checked ? "bg-lime-300" : "bg-red-300"} p-1`}
                          >
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </td>
                  );
                case "checkbox":
                  return (
                    <td key={indexCol} className="p-4 border border-zinc-600">
                      {item.answers.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Checkbox checked={item.checked} variant="soft" />
                          <p
                            className={`${item.checked ? "bg-lime-300" : "bg-red-300"} p-1`}
                          >
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </td>
                  );
                default:
                  return (
                    <td key={indexCol} className="border border-zinc-600"></td>
                  );
              }
            })}
            <td className="p-4 border border-zinc-600">{`${questionTemplates.length} / ${questionTemplates.length}`}</td>
          </tr>
          {rows.map((row, indexRow) => {
            return (
              <tr key={indexRow}>
                <td className="p-4 border border-zinc-600">{indexRow + 1}</td>
                {row.map((col, indexCol) => {
                  const templateQuestion = questionTemplates.find(
                    (item) => item.id === col.questionId
                  );

                  const answersWithAreRight = someSit[indexRow][indexCol];

                  switch (templateQuestion?.type) {
                    case "radio":
                      return (
                        <td
                          key={indexCol}
                          className="p-4 border border-zinc-600"
                        >
                          {answersWithAreRight.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Radio checked={item.checked} variant="soft" />
                              <p
                                className={cn(
                                  {
                                    "bg-lime-300": item.right,
                                    "bg-red-300": !item.right,
                                    "bg-orange-300": !item.checked,
                                  },
                                  "p-1"
                                )}
                              >
                                {item.answer}
                              </p>
                            </div>
                          ))}
                        </td>
                      );
                    case "checkbox":
                      return (
                        <td
                          key={indexCol}
                          className="p-4 border border-zinc-600"
                        >
                          {answersWithAreRight.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Checkbox checked={item.checked} variant="soft" />
                              <p
                                className={cn(
                                  {
                                    "bg-lime-300": item.right,
                                    "bg-red-300": !item.right,
                                    "bg-orange-300": !item.checked,
                                  },
                                  "p-1"
                                )}
                              >
                                {item.answer}
                              </p>
                            </div>
                          ))}
                        </td>
                      );
                    default:
                      return (
                        <td
                          key={indexCol}
                          className="border border-zinc-600"
                        ></td>
                      );
                  }
                })}
                <td className="p-4 border border-zinc-600">
                  {rowsResult[indexRow]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
