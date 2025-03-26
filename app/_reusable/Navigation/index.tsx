"use client";

import React from "react";
import Link from "next/link";

export const Navigation = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const handleLogin = () => {
  //   // В реальной ситуации здесь будет логика авторизации
  //   setIsAuthenticated(true);
  // };

  // const handleLogout = () => {
  //   // В реальной ситуации здесь будет логика выхода
  //   setIsAuthenticated(false);
  // };

  return (
    <nav className="bg-gray-800 p-4 sticky z-[100] top-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-semibold">
          <Link href="/">OprosRU</Link>
        </div>
        {/* <div className="space-x-6">
          <Link href="/" className="text-white hover:text-gray-400">
            Главная
          </Link>
          <Link href="/about" className="text-white hover:text-gray-400">
            О нас
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-400">
            Контакты
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/profile" className="text-white hover:text-gray-400">
                Профиль
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-400 bg-red-500 px-4 py-2 rounded-md"
              >
                Выход
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white hover:text-gray-400">
                Вход
              </Link>
              <Link href="/register" className="text-white hover:text-gray-400">
                Регистрация
              </Link>
              <button
                onClick={handleLogin}
                className="text-white hover:text-gray-400 bg-blue-500 px-4 py-2 rounded-md"
              >
                Войти
              </button>
            </>
          )}
        </div> */}
      </div>
    </nav>
  );
};
