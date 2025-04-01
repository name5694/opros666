// components/Footer.js
import React from "react";
import { Box, Container, Typography, Divider } from "@mui/joy";
import Link from "next/link";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.level1",
        paddingTop: 4,
        paddingBottom: 4,
        borderTop: 1,
        borderColor: "divider",
        marginTop: "auto",
      }}
    >
      <Container>
        <Typography
          level="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          OprosRU — ваш сервис для создания опросов
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            marginBottom: 2,
          }}
        >
          <Link href="/create" className="text-blue-500">
            Создать опрос
          </Link>
          <Link href="/info" className="text-blue-500">
            О нас
          </Link>
          <Link href="/contacts" className="text-blue-500">
            Контакты
          </Link>
          <Link href="/terms" className="text-blue-500">
            Условия
          </Link>
        </Box>

        <Typography level="body-md" textAlign="center">
          &copy; {new Date().getFullYear()} oprosru.ru. Все права защищены.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
