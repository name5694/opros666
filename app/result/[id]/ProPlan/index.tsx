"use client";
import React, { useState } from "react";
import { Typography, Divider, IconButton } from "@mui/joy";
import { Star, StarBorder } from "@mui/icons-material";
import { Download } from "@/app/result/[id]/ProPlan/Download";
import { Pay } from "@/app/_reusable/Pay";

export const ProPlan = ({ data }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="flex justify-center items-center py-10">
      <div className="max-w-[800px] flex max-md:flex-col ring-4 ring-slate-500 rounded-md items-center p-2">
        <div className="flex justify-center items-center flex-col p-2">
          <Typography level="h4" fontWeight="lg">
            Про версия
          </Typography>
          <div className="flex space-x-1">
            {!clicked ? (
              [...Array(5)].map((_, index) => (
                <IconButton key={index}>
                  {index < 5 ? <Star /> : <StarBorder />}
                </IconButton>
              ))
            ) : (
              <span>активирована!</span>
            )}
          </div>
        </div>
        <Divider />
        {!clicked && (
          <div className="py-4">
            <Typography level="body-md" className="text-center">
              Платный тариф позволяет выгружать результаты опроса в Excel файл.
            </Typography>
            <Typography
              level="h2"
              sx={{ mt: 2 }}
              fontWeight="lg"
              className="text-center"
            >
              299 руб
            </Typography>
            {/* <Typography level="body-md" sx={{ mt: 1 }} className="text-center">
              Возможность отмены в течение 7 дней.
            </Typography> */}
          </div>
        )}
        <Divider />

        <div className="p-2 max-md:pb-0">
          {clicked ? (
            <Download data={data} />
          ) : (
            <Pay onClick={() => setClicked(true)} />
          )}
        </div>
      </div>
    </div>
  );
};
