import React from "react";
import { Typography, Divider, IconButton } from "@mui/joy";
import { Star, StarBorder } from "@mui/icons-material";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/prisma/db";
import { ButtonPlan } from "@/app/result/[id]/ProPlan/ButotnPlan";
import { InfoBuy } from "@/app/_reusable/InfoBuy";

export const ProPlan = async ({ data }) => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();
  const payments = await prisma.payment.findMany({
    where: {
      userId: user?.id,
    },
  });
  const isPaid =
    user &&
    payments.some((item) => item.lifetime || item.paidUntil > new Date());

  const clicked = false;
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
        <InfoBuy />
        <Divider />

        <div className="p-2 max-md:pb-0">
          <ButtonPlan
            isPaid={isPaid}
            isUserAuthenticated={isUserAuthenticated}
            data={data}
            email={user?.email}
            userId={user?.id}
          />
        </div>
      </div>
    </div>
  );
};
