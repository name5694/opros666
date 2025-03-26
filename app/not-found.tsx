// pages/404.js
import React from "react";
import { Box, Button, Container, Typography } from "@mui/joy";
import Link from "next/link";

const NotFoundPage = () => {
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
        <Typography
          level="h1"
          sx={{ fontWeight: "bold", fontSize: "5rem", color: "primary.main" }}
        >
          404
        </Typography>
        <Typography level="h2" sx={{ marginTop: 2, fontSize: "1.5rem" }}>
          Упс! Страница не найдена.
        </Typography>
        <Typography sx={{ marginTop: 2, color: "text.secondary" }}>
          Мы не можем найти страницу, которую вы ищете. Возможно, вы перешли по
          неправильной ссылке.
        </Typography>

        <Box sx={{ marginTop: 4 }}>
          <Button variant="solid" sx={{ marginRight: 2 }}>
            <Link href="/" passHref>
              <Typography sx={{ textDecoration: "none", color: "inherit" }}>
                Вернуться на главную
              </Typography>
            </Link>
          </Button>
          <Button variant="outlined">
            <Link href="/contacts" passHref>
              <Typography sx={{ textDecoration: "none", color: "inherit" }}>
                Связаться с нами
              </Typography>
            </Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
