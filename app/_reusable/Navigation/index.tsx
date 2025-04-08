"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  getUserSubscriptionInfo,
  updateOprosCreatorId,
} from "@/actions/actions";
import { redirect, usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer, IconButton } from "@mui/joy";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";

const Navigation = () => {
  const { isAuthenticated, user } = useKindeBrowserClient();
  const [sub, setSub] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    if (user) {
      getUserSubscriptionInfo(user.id).then((result) => {
        if (result !== "no-pro") setSub(result);
      });

      const isCreatorPage = /^\/(created|result)\//.test(pathname);
      if (isCreatorPage) {
        const match = pathname.match(/^\/(created|result)\/([^\/]+)/);
        const resultId = match ? match[2] : null;
        updateOprosCreatorId(resultId, user.id);
      }
    }
    setRedirectUrl(window.location.href);
  }, [user, pathname]);

  const isSurvey = pathname.startsWith("/lets-go");
  const [redirectUrl, setRedirectUrl] = useState("/");

  return (
    <nav className="bg-gray-800 p-4 sticky z-[100] top-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-semibold">
          <Link href="/">OprosRU</Link>
        </div>
        <div className="space-x-6">
          {/* <Link href="/" className="text-white hover:text-gray-400">
            Главная
          </Link>
          <Link href="/about" className="text-white hover:text-gray-400">
            О нас
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-400">
            Контакты
          </Link> */}
          {!isSurvey && (
            <div>
              {isAuthenticated ? (
                <AuthMenu sub={sub} user={user} />
              ) : (
                <div className="space-x-6">
                  <RegisterLink
                    className="text-white hover:text-amber-300"
                    postLoginRedirectURL={redirectUrl}
                  >
                    Регистрация
                  </RegisterLink>

                  <LoginLink
                    className="text-white hover:text-black bg-blue-500 px-4 py-2 rounded-md"
                    postLoginRedirectURL={redirectUrl}
                  >
                    Войти
                  </LoginLink>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

function AuthMenu({ sub, user }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(inOpen);
    };

  return (
    <>
      <div className="flex items-center gap-10 max-md:hidden">
        <Link
          href={"/history"}
          className="hover:text-black bg-green-300 px-4 py-2 rounded-md cursor-pointer text-zinc-700"
        >
          Созданные опросы
        </Link>
        {sub && (
          <div>
            <p className="text-yellow-400 text-center font-bold">PRO</p>
            <p className="text-zinc-300 text-center">{sub}</p>
          </div>
        )}
        <span className="text-white mr-2">{user.email}</span>

        <LogoutLink className="text-white hover:text-black bg-red-500 px-4 py-2 rounded-md">
          Выйти
        </LogoutLink>
      </div>
      <div className="flex items-center gap-3 md:hidden justify-end">
        <span className="text-white truncate flex-shrink">{user.email}</span>
        <IconButton
          variant="soft"
          onClick={() => {
            setOpen(true);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
          <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem className="hover:text-black bg-green-300 px-4 py-2 rounded-md cursor-pointer text-zinc-700">
                <ListItemButton onClick={() => redirect("/history")}>
                  Созданные опросы
                </ListItemButton>
              </ListItem>
              {sub && (
                <ListItem className="bg-black">
                  <div>
                    <p className="text-yellow-400 text-center font-bold ">
                      Подписка PRO
                    </p>
                    <p className="text-zinc-300 text-center">{sub}</p>
                  </div>
                </ListItem>
              )}
              <ListItem>
                <ListItemButton>
                  <LogoutLink className="text-white hover:text-black bg-red-500 px-4 py-2 rounded-md">
                    Выйти
                  </LogoutLink>
                </ListItemButton>
              </ListItem>
            </List>

            <Link href={"/history"}></Link>

            <span className="text-white mr-2">{user.email}</span>
          </Box>
        </Drawer>
      </div>
    </>
  );
}

export default Navigation;
