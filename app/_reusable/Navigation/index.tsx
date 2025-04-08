"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getUserSubscriptionInfo } from "@/actions/actions";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const { isAuthenticated, user } = useKindeBrowserClient();
  const [sub, setSub] = useState("");
  useEffect(() => {
    if (user) {
      getUserSubscriptionInfo(user.id).then((result) => {
        if (result !== "no-pro") setSub(result);
      });
    }
    setRedirectUrl(window.location.href);
  }, [user]);

  const pathname = usePathname();
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
            <div className="space-x-6">
              {isAuthenticated ? (
                <div className="flex items-center gap-10">
                  {sub && (
                    <div>
                      <p className="text-yellow-400 text-center font-bold">
                        PRO
                      </p>
                      <p className="text-zinc-300 text-center">{sub}</p>
                    </div>
                  )}
                  <span className="text-white mr-2">{user.email}</span>

                  <LogoutLink className="text-white hover:text-black bg-red-500 px-4 py-2 rounded-md">
                    Выйти
                  </LogoutLink>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
