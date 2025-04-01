"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

function Search() {
  const params = useSearchParams();

  const MNT_TRANSACTION_ID = params.get("MNT_TRANSACTION_ID"); // Внутренний идентификатор заказа, однозначно определяющий заказ в магазине.
  const MNT_ID = params.get("MNT_ID"); // Идентификатор магазина в системе MONETA.RU
  const MNT_OPERATION_ID = params.get("MNT_OPERATION_ID"); // Номер операции в системе MONETA.RU

  console.log(MNT_TRANSACTION_ID, MNT_ID, MNT_OPERATION_ID);
  return <h1 className="text-2xl font-bold p-2">Успешная оплата</h1>;
}
const Processing = () => {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
};

export default Processing;
