"use client";
import React from "react";
import * as XLSX from "xlsx";
import { Button } from "@mui/joy";

const xmlFacade = (data) => {
  const newData = data.map((row) => {
    const newRowObj = {};

    console.log(
      row.map((col, colIndex) => {
        col.map((checkbox) => {
          console.log(checkbox);
          if (checkbox.type === "checkbox") {
            const prevValue = newRowObj[`${colIndex + 1}.${checkbox.question}`];
            if (prevValue) {
              newRowObj[`${colIndex + 1}.${checkbox.question}`] =
                `${prevValue}\n${
                  checkbox.answer
                }${checkbox.right ? "(Выбран верно)" : "(Выбран не верно)"}`;
            } else {
              newRowObj[`${colIndex + 1}.${checkbox.question}`] =
                checkbox.answer +
                (checkbox.right ? "(Выбран верно)" : "(Выбран не верно)");
            }
          } else if (checkbox.type === "radio") {
            newRowObj[`${colIndex + 1}.${checkbox.question}`] =
              checkbox.answer +
              (checkbox.right ? "(Выбран верно)" : "(Выбран не верно)");
          } else if (checkbox.type === "text") {
            newRowObj[`${colIndex + 1}.${checkbox.question}`] = checkbox.text;
          }
        });
      })
    );
    return newRowObj;
  });
  return newData;
};
export const Download = ({ data }) => {
  console.log(data);
  data = xmlFacade(data);
  console.log(data);
  const onClick = () => {
    // const data = [
    //   { name: "Alice", chuka: 227, age: 25 },
    //   { name: "Bob", age: 30 },
    //   { name: "Charlie", age: 35 },
    // ];

    // Преобразуем данные в лист Excel
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Создаем бинарный массив и преобразуем его в blob для скачивания
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    // Создаем ссылку для скачивания
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.xlsx";
    link.click();
  };

  return <Button onClick={onClick}>Скачать результат в excel</Button>;
};
