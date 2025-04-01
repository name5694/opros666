"use client";
import axios from "axios";
import React, { useEffect } from "react";
import md5 from "md5";
import { Button } from "@mui/joy";

export const Pay = ({ onClick }) => {
  async function payPaySykaBleat() {
    const p = {
      MNT_ID: "71098518",
      MNT_INTEGRITY_CODE: 12346,
      MNT_AMOUNT: "100.00",
      MNT_TRANSACTION_ID: `1|${new Date().toISOString()}`,
      MNT_CURRENCY_CODE: "RUB",
      MNT_TEST_MODE: "1",
      MNT_DESCRIPTION: "Оплата PRO функционала сайта oprosru.ru",
      MNT_SUBSCRIBER_ID: "qazwsaqaz@yandex.ru",
      MNT_SUCCESS_URL: "https://oprosru.ru/success",
      MNT_FAIL_URL: "https://oprosru.ru/fail-payment",
      MNT_SIGNATURE: "",
    };
    p.MNT_SIGNATURE = md5(
      p.MNT_ID +
        p.MNT_TRANSACTION_ID +
        p.MNT_AMOUNT +
        p.MNT_CURRENCY_CODE +
        p.MNT_SUBSCRIBER_ID +
        p.MNT_TEST_MODE +
        p.MNT_INTEGRITY_CODE
    );
    //MNT_SUBSCRIBER_ID походу не участвует

    axios.get("https://payanyway.ru/assistant.htm", { params: p });
  }
  console.log(payPaySykaBleat, onClick);

  useEffect(() => {
    // payPaySykaBleat();
  }, []);

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
      <input
        type="hidden"
        name="MNT_SUBSCRIBER_ID"
        value="qazwsaqaz@yandex.ru"
      />

      <input type="hidden" name="MNT_CUSTOM1" value="1234567890" />
      <input type="hidden" name="MNT_CUSTOM2" value="abcdefghij" />
      <input type="hidden" name="moneta.locale" value="ru" />
      <input type="hidden" name="MNT_CUSTOM3" value="qazwsaqaz@yandex.ru" />
      {/* <input type="submit" value="Pay order" /> */}
      <Button fullWidth type="submit">
        Купить Про версию
      </Button>
    </form>
  );
};
