"use client";
import React from "react";
import * as XLSX from "xlsx";
import { Button } from "@mui/joy";

const xmlFacade = (data) => {
  const newData = data.map((row) => {
    const newRowObj = {};

    row.map((col, colIndex) => {
      col.map((checkbox) => {
        if (checkbox.type === "checkbox") {
          const isIdealAnswer = !checkbox.checked && checkbox.right;
          const isCheckedRight = checkbox.checked && checkbox.right;
          const isCheckedFalsy = checkbox.checked && !checkbox.right;
          const prevValue =
            newRowObj[`${colIndex + 1}.${checkbox.question}`] ?? "";
          if (isIdealAnswer) {
            newRowObj[`${colIndex + 1}.${checkbox.question}`] = `${prevValue}${
              checkbox.answer
            } (Не выбранный верный ответ) `;
          } else if (isCheckedRight) {
            newRowObj[`${colIndex + 1}.${checkbox.question}`] = `${prevValue}${
              checkbox.answer
            } (Выбран верный ответ) `;
          } else if (isCheckedFalsy) {
            newRowObj[`${colIndex + 1}.${checkbox.question}`] = `${prevValue}${
              checkbox.answer
            } (Выбран неверный ответ) `;
          }
        } else if (checkbox.type === "radio") {
          const isIdealAnswer = !checkbox.checked && checkbox.right;
          const isCheckedRight = checkbox.checked && checkbox.right;
          const isCheckedFalsy = checkbox.checked && !checkbox.right;
          const prevValue =
            newRowObj[`${colIndex + 1}.${checkbox.question}`] ?? "";
          if (isIdealAnswer) {
            newRowObj[`${colIndex + 1}.${checkbox.question}`] = `${prevValue}${
              checkbox.answer
            } (Не выбранный верный ответ) `;
          } else if (isCheckedRight) {
            newRowObj[`${colIndex + 1}.${checkbox.question}`] = `${prevValue}${
              checkbox.answer
            } (Выбран верный ответ) `;
          } else if (isCheckedFalsy) {
            newRowObj[`${colIndex + 1}.${checkbox.question}`] = `${prevValue}${
              checkbox.answer
            } (Выбран неверный ответ) `;
          }
        } else if (checkbox.type === "text") {
          newRowObj[`${colIndex + 1}.${checkbox.question}`] = checkbox.text;
        }
      });
    });
    return newRowObj;
  });
  return newData;
};
export const Download = ({ data: dataProp }) => {
  const data = xmlFacade(dataProp);
  const onClick = () => {
    // const data = [
    //   { name: "Alice", chuka: 227, age: 25 },
    //   { name: "Bob", age: 30 },
    //   { name: "Charlie", age: 35 },
    // ];

    // Преобразуем данные в лист Excel
    const keys = Object.keys(data[0]);
    const maxLengths = {};
    for (const key of keys) {
      maxLengths[key] = key.length + 1;
    }
    for (const item of data) {
      for (const key of keys) {
        if (!maxLengths[key] || maxLengths[key] < item[key].length) {
          maxLengths[key] = item[key].length + 1;
        }
      }
    }
    const widthArr = [];
    for (const key of keys) {
      const index = +key.split(".")[0] - 1;
      widthArr[index] = {
        wch: maxLengths[key],
      };
    }
    for (let i = 0; i < widthArr.length; i++) {
      const length = widthArr[i];
      if (length < 10) {
        widthArr[i] += 3;
      } else if (length < 20) {
        widthArr[i] += 2;
      } else if (length < 50) {
        widthArr[i] += 1;
      }
    }
    const ws = XLSX.utils.json_to_sheet(data);
    ws["!cols"] = widthArr;
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
