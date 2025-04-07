"use client";
import { Pay } from "@/app/_reusable/Pay";
import { Download } from "@/app/result/[id]/ProPlan/Download";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@mui/joy";
import React from "react";

export const ButtonPlan = ({
  isPaid,
  isUserAuthenticated,
  data,
  userId,
  email,
}) => {
  return isPaid ? (
    <Download data={data} />
  ) : isUserAuthenticated ? (
    <Pay email={email} userId={userId} />
  ) : (
    <LoginLink postLoginRedirectURL={window.location.href}>
      <Button fullWidth>Авторизоваться для покупки</Button>
    </LoginLink>
  );
};
