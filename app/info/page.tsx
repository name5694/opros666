// pages/about.js
import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemDecorator,
} from "@mui/joy";
import Link from "next/link";

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography level="h2" sx={{ fontWeight: "bold" }}>
          О нас
        </Typography>
        <Typography sx={{ marginTop: 2 }}>
          OprosRU — это надежный и удобный инструмент для создания опросов и
          сбора данных. Мы предоставляем интуитивно понятный интерфейс для
          быстрого создания анкеты и получения аналитики в реальном времени.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid xs={12} md={6}>
          <Box sx={{ textAlign: "center" }}>
            <Typography level="h4" sx={{ fontWeight: "bold" }}>
              Наша миссия
            </Typography>
            <Typography level="body-lg" sx={{ marginTop: 2 }}>
              Мы стремимся предоставить бизнесу, образовательным учреждениям и
              частным пользователям эффективное решение для создания опросов.
              Наша цель — помочь вам собирать данные быстро, точно и без лишних
              усилий.
            </Typography>
          </Box>
        </Grid>

        <Grid xs={12} md={6}>
          <Box sx={{ textAlign: "center" }}>
            <Typography level="h4" sx={{ fontWeight: "bold" }}>
              Почему выбирают OprosRU
            </Typography>
            <List sx={{ marginTop: 2 }}>
              <ListItem>
                <ListItemDecorator>✅</ListItemDecorator>
                Простота в использовании: интуитивно понятный интерфейс, который
                не требует обучения.
              </ListItem>
              <ListItem>
                <ListItemDecorator>⚡</ListItemDecorator>
                Мгновенная аналитика: результаты опросов в реальном времени,
                доступные в удобном формате.
              </ListItem>
              <ListItem>
                <ListItemDecorator>🔒</ListItemDecorator>
                Безопасность данных: все опросы защищены и доступны только для
                авторизованных пользователей.
              </ListItem>
              <ListItem>
                <ListItemDecorator>🌍</ListItemDecorator>
                Универсальность: возможность создания опросов на нескольких
                языках с различными вариантами вопросов.
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography>
          Присоединяйтесь к OprosRU и начните создавать опросы, которые помогут
          вам собирать ценные данные для вашего бизнеса или проекта.
        </Typography>
        <Button variant="solid" sx={{ marginTop: 2 }}>
          <Link
            href="/create-survey"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Создать опрос
          </Link>
        </Button>
      </Box>
    </Container>
  );
};

export default About;
