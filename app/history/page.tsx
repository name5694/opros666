// pages/history.js
import React from "react";
import { Box, Button, Container, Typography, List, ListItem } from "@mui/joy";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/prisma/db";

const HistoryPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const surveys = await prisma.opros.findMany({
    where: {
      creatorId: user?.id,
    },
  });

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
          История созданных опросов
        </Typography>

        <Typography level="body-sm" sx={{ marginTop: 2 }}>
          Здесь вы можете увидеть все опросы, которые были созданы вами.
        </Typography>

        <List sx={{ width: "100%", marginTop: 4 }}>
          {surveys.map((survey) => (
            <ListItem key={survey.id} sx={{ padding: 0, marginTop: 2 }}>
              <Link href={`/created/${survey.resultId}`} passHref>
                <Button variant="outlined" sx={{ width: "100%" }}>
                  {survey.name}
                </Button>
              </Link>
            </ListItem>
          ))}
        </List>

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

export default HistoryPage;
