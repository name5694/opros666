import React, { FC } from "react";
import { IAnswer, IQuestion } from "../page";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import { Button, Checkbox, IconButton } from "@mui/joy";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { DebounceInput } from "@/app/_reusable/debounce-input";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { QuestionTypeSelect } from "@/app/create/QuestionCreate/QuestionTypeSelect";
import { SelectChangeEvent } from "@mui/material";

export const QuestionCreate: FC<{
  question: IQuestion;
  changeAnswers: (newArray: IAnswer[]) => void;
  handleChangeType: (type: SelectChangeEvent) => void;
  handleSelectRadioAnswer: (answerIndex: number) => void;
  handleSelectCheckboxAnswer: (answerIndex: number) => void;
  changeQuestionName: (name: string) => void;
}> = ({
  question,
  changeAnswers,
  handleChangeType,
  handleSelectRadioAnswer,
  handleSelectCheckboxAnswer,
  changeQuestionName,
}) => {
  const answers = question.answers;

  const [selectedValue, setSelectedValue] = React.useState<number | null>(null);
  const [newValue, setNewValue] = React.useState("");

  const add = () => {
    changeAnswers([
      ...answers,
      {
        answer: newValue,
        checked: false,
      },
    ]);
    setNewValue("");
  };

  return (
    <div className="mt-4 ring p-2">
      <DebounceInput
        placeholder="Введите вопрос"
        defaultValue={question.question}
        handleDebounce={changeQuestionName}
        debounceTimeout={300}
      />
      <QuestionTypeSelect
        type={question.type}
        handleChangeType={handleChangeType}
      />
      <RadioGroup
        aria-labelledby="storage-label"
        defaultValue="512GB"
        size="lg"
        sx={{ gap: 1.5 }}
      >
        {answers.map((item, index) => {
          const { answer: value, checked } = item;
          return (
            <Sheet
              key={`${value} + ${index}`}
              sx={{
                p: 2,
                borderRadius: "md",
                boxShadow: "sm",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              {question.type === "radio" && (
                <Radio
                  checked={checked}
                  variant="solid"
                  onClick={() => handleSelectRadioAnswer(index)}
                />
              )}
              {question.type === "checkbox" && (
                <Checkbox
                  variant="solid"
                  checked={checked}
                  onClick={() => {
                    handleSelectCheckboxAnswer(index);
                  }}
                />
              )}

              <DebounceInput
                defaultValue={value}
                placeholder="Задайте ответ"
                variant="soft"
                sx={{ flex: 1 }}
                handleDebounce={(answer) => {
                  const arr = [...answers];
                  arr.splice(index, 1, { ...item, answer });

                  changeAnswers(arr);
                }}
                debounceTimeout={300}
              />
              <div
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <Dropdown>
                  <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{
                      root: { variant: "outlined", color: "neutral" },
                    }}
                    disabled={answers.length < 2}
                  >
                    <DeleteOutlineIcon />
                  </MenuButton>
                  <Menu>
                    <MenuItem
                      onClick={() => {
                        if (selectedValue === index) setSelectedValue(null);
                        if (selectedValue !== null && selectedValue > index)
                          setSelectedValue(selectedValue - 1);
                        const arr = [...answers];
                        arr.splice(index, 1);
                        changeAnswers(arr);
                      }}
                    >
                      Удалить
                    </MenuItem>
                    <MenuItem>Отмена</MenuItem>
                  </Menu>
                </Dropdown>
              </div>
            </Sheet>
          );
        })}
      </RadioGroup>
      {
        <Button sx={{ backgroundColor: "#c357a2", mt: 1 }} onClick={add}>
          Добавить ответ
        </Button>
      }
    </div>
  );
};
