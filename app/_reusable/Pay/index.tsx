"use client";
// import axios from "axios";
import React, { useEffect } from "react";
// import md5 from "md5";
import { Button } from "@mui/joy";
import { createPayment } from "@/actions/actions";
import { useParams } from "next/navigation";

export const Pay = ({ email, userId }) => {
  const { id: returnOprosId } = useParams<{ id: string }>();
  // async function payPay() {
  //   const p = {
  //     MNT_ID: "71098518",
  //     MNT_INTEGRITY_CODE: 12346,
  //     MNT_AMOUNT: "100.00",
  //     MNT_TRANSACTION_ID: `1|${new Date().toISOString()}`,
  //     MNT_CURRENCY_CODE: "RUB",
  //     MNT_TEST_MODE: "1",
  //     MNT_DESCRIPTION: "Оплата PRO функционала сайта oprosru.ru",
  //     MNT_SUBSCRIBER_ID: "qazwsaqaz@yandex.ru",
  //     MNT_SUCCESS_URL: "https://oprosru.ru/success",
  //     MNT_FAIL_URL: "https://oprosru.ru/fail-payment",
  //     MNT_SIGNATURE: "",
  //   };
  //   p.MNT_SIGNATURE = md5(
  //     p.MNT_ID +
  //       p.MNT_TRANSACTION_ID +
  //       p.MNT_AMOUNT +
  //       p.MNT_CURRENCY_CODE +
  //       p.MNT_SUBSCRIBER_ID +
  //       p.MNT_TEST_MODE +
  //       p.MNT_INTEGRITY_CODE
  //   );
  //   //MNT_SUBSCRIBER_ID походу не участвует

  //   axios.get("https://payanyway.ru/assistant.htm", { params: p });
  // }

  useEffect(() => {
    // payPaySykaBleat();
  }, []);

  const onClick = async (e) => {
    e.preventDefault();

    const MNT_TRANSACTION_ID = `test|${new Date().toISOString()}`;
    document
      .querySelector("[name=MNT_TRANSACTION_ID]")
      .setAttribute("value", MNT_TRANSACTION_ID);
    await createPayment({
      MNT_TRANSACTION_ID, // or generate a dynamic ID if needed
      MNT_CURRENCY_CODE: "RUB",
      MNT_AMOUNT: "1.00", // Make sure this matches the actual amount for the payment
      MNT_TEST_MODE: "0", // Assuming 0 for production mode
      MNT_SUBSCRIBER_ID: email,
      userId,
      returnOprosId,
    });
    e.target.form.submit();
  };

  return (
    <form method="post" action="https://www.payanyway.ru/assistant.htm">
      <input type="hidden" name="MNT_ID" value="71098518" />
      <input
        type="hidden"
        name="MNT_TRANSACTION_ID"
        value={`test|${new Date().toISOString()}`}
      />
      <input type="hidden" name="MNT_CURRENCY_CODE" value="RUB" />
      <input type="hidden" name="MNT_AMOUNT" value="1.00" />
      <input type="hidden" name="MNT_TEST_MODE" value="0" />
      <input
        type="hidden"
        name="MNT_SUCCESS_URL"
        value="https://oprosru.ru/success"
      />
      <input
        type="hidden"
        name="MNT_FAIL_URL"
        value="https://oprosru.ru/fail-payment"
      />
      <input
        type="hidden"
        name="MNT_RETURN_URL"
        value="https://oprosru.ru/payment"
      />
      <input
        type="hidden"
        name="MNT_INPROGRESS_URL"
        value="https://oprosru.ru/processing"
      />
      <input type="hidden" name="MNT_SUBSCRIBER_ID" value={email} />

      <input type="hidden" name="MNT_CUSTOM1" value="1234567890" />
      <input type="hidden" name="MNT_CUSTOM2" value="abcdefghij" />
      <input type="hidden" name="moneta.locale" value="ru" />
      <input type="hidden" name="MNT_CUSTOM3" value={email} />
      {/* <input type="submit" value="Pay order" /> */}
      <Button fullWidth type="submit" onClick={onClick} id="buy-btn">
        Оформить подписку
      </Button>
    </form>
  );
};
