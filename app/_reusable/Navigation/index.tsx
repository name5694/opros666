"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getUserSubscriptionInfo } from "@/actions/actions";

export const Navigation = () => {
  const { isAuthenticated, user } = useKindeBrowserClient();
  const [sub, setSub] = useState("");
  useEffect(() => {
    if (user) {
      getUserSubscriptionInfo(user.id).then((result) => {
        if (result !== "no-pro") setSub(result);
      });
    }
  }, [user]);

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

          {isAuthenticated ? (
            <div className="flex items-center gap-10">
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
          ) : (
            <>
              <Link
                href="/register"
                className="text-white hover:text-amber-300"
              >
                Регистрация
              </Link>
              <LoginLink className="text-white hover:text-black bg-blue-500 px-4 py-2 rounded-md">
                Войти
              </LoginLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
