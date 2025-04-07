"use client";
import { getUserSubscriptionInfo } from "@/actions/actions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";

export const InfoBuy = () => {
  const { user } = useKindeBrowserClient();
  const [sub, setSub] = useState("");
  useEffect(() => {
    if (user) {
      getUserSubscriptionInfo(user.id).then((result) => {
        if (result !== "no-pro") setSub(result);
      });
    }
  }, [user]);

  if (sub) return null;
  return (
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
      <Typography level="body-md" sx={{ mt: 1 }} className="text-center">
        Подписка будет активна 30 дней. Для продления необходимо будет
        произвести повторную оплату.
      </Typography>
    </div>
  );
};
