"use client";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MySelect } from "@/reusable/MySelect";
import MyNumberInput from "@/reusable/MyNumberInput";
import { Question } from "@/app/create/Question";
import { useState } from "react";

const Page = () => {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const [questionsArr, setQestionsArr] = useState<any[]>([1, 2, 3]);
  const addVipos = () => {
    setQestionsArr(prev => ([
      ...prev,
      `Вопрос ${questionsArr.length + 1}`
    ]));
  };

  return (
    <div>
      <MySelect />
      <div className="max-w-36 numberWrapper">
        {/* <MyNumberInput min={0} /> */}
        {questionsArr.map((question, i) => (
          <Question number={i + 1} key={i} />
        ))}

        <button onClick={addVipos}>Добавить вiпрос</button>
      </div>
    </div>
  );
};

export default Page;
