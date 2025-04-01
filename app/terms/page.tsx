// pages/terms.js
import React from "react";
import { Box, Button, Container, Typography } from "@mui/joy";
import Link from "next/link";

const TermsPage = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", paddingTop: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography level="h2" sx={{ fontWeight: "bold" }}>
          Условия оформления заказа
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          Добро пожаловать на{" "}
          <span className="font-bold text-lg">oprosru.ru</span>! Мы предлагаем
          удобный сервис для создания и проведения опросов. Ознакомьтесь с
          нашими условиями, чтобы правильно оформить заказ и оплату.
        </Typography>

        <Typography level="h3" sx={{ marginTop: 4, fontWeight: "bold" }}>
          Порядок оформления и сроки исполнения заказа:
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          1. Для того чтобы воспользоваться нашими услугами, вам необходимо
          зарегистрироваться на сайте{" "}
          <span className="font-bold text-lg">oprosru.ru</span> и выбрать
          соответствующий тариф (например, подписка для скачивания результатов
          опросов в формате Excel).
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          2. После выбора тарифа, вам нужно будет заполнить данные для оплаты
          (например, через банковскую карту или другие удобные способы).
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          3. После подтверждения оплаты, доступ к дополнительным функциям
          (например, скачивание результатов опросов в формате Excel) будет
          предоставлен мгновенно.
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          4. Сроки исполнения заказов: доступ к выбранным функциям
          предоставляется сразу после успешной оплаты.
        </Typography>

        <Typography level="h3" sx={{ marginTop: 4, fontWeight: "bold" }}>
          Условия оплаты:
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          1. Оплата услуг осуществляется в рублях Российской Федерации.
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          2. Мы принимаем оплату через платежную систему:{" "}
          <span className="font-bold">Payanyway</span>. Вы сможете оплатить
          банковской картой и через СБП.
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          3. Платный функционал - возможность скачивать результаты опроса в
          формате excel. Стоимость платного функционала составляет 299 рублей.
          {/* Подписка автоматически продлевается, если не была отменена пользователем. */}
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          4. Вы получите подтверждение о платеже сразу после успешной
          транзакции.
        </Typography>

        <Typography level="h3" sx={{ marginTop: 4, fontWeight: "bold" }}>
          Условия возврата:
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          1. Вы можете оформить возврат в течение 7 дней после оформления
          услуги, написав на почту{" "}
          <span className="font-bold">support@oprosru.ru</span>.
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          2. Если у вас возникли технические проблемы с использованием сервиса,
          вы можете обратиться в нашу службу поддержки, и мы постараемся как
          можно быстрее решить ваш вопрос.
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          4. Для получения дополнительной информации или решения спорных
          вопросов, пожалуйста, обращайтесь в нашу службу поддержки по адресу{" "}
          <span className="font-bold">support@oprosru.ru</span>.
        </Typography>

        <Box sx={{ marginBlock: 4 }}>
          <Button variant="solid">
            <Link href="/" passHref>
              <Typography sx={{ textDecoration: "none", color: "inherit" }}>
                Вернуться на главную
              </Typography>
            </Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TermsPage;
