import React, { FC } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { QuestionType } from "@/app/create/page";

export const QuestionTypeSelect: FC<{
  type: QuestionType;
  handleChangeType: (type: SelectChangeEvent) => void;
}> = ({ type, handleChangeType }) => {
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Тип вопроса
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={type}
          onChange={handleChangeType}
        >
          <MenuItem value={"text"}>Текст</MenuItem>
          <MenuItem value={"radio"}>Одиночный выбор</MenuItem>
          <MenuItem value={"checkbox"}>Множественный выбор</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
