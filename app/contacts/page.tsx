// pages/contact.js
import React from "react";
import { Box, Button, Container, Typography } from "@mui/joy";
import Link from "next/link";

const ContactPage = () => {
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
          Контакты
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          Мы всегда рады услышать ваше мнение! Если у вас есть вопросы,
          предложения или комментарии по поводу нашего сервиса, не стесняйтесь
          обращаться.
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          Мы стремимся к постоянному улучшению и готовы помочь вам с любыми
          проблемами, которые могут возникнуть при использовании нашего сервиса.
        </Typography>

        <Typography level="body-md" sx={{ marginTop: 4 }}>
          Напишите нам по адресу:
        </Typography>

        <Typography
          level="body-md"
          sx={{ marginTop: 0, fontWeight: "bold", color: "primary.main" }}
        >
          support@oprosru.ru
        </Typography>

        <Typography sx={{ marginTop: 2, color: "text.secondary" }}>
          Мы постараемся ответить на ваш запрос в течение 24 часов.
        </Typography>

        {/* Добавление информации о продавце */}
        <Typography level="body-md" sx={{ marginTop: 4 }}>
          <noindex>
            <span aria-hidden="true">
              Продавец: Филонов Александр Александрович
            </span>
          </noindex>
        </Typography>

        <Typography level="body-md" sx={{ marginTop: 1 }}>
          <noindex>
            <span aria-hidden="true">ИНН: 212412732633</span>
          </noindex>
        </Typography>

        <Box sx={{ marginTop: 4 }}>
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

export default ContactPage;
