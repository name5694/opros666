import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: "url('/hero-main.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4 py-20 md:py-40">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Добро пожаловать на OprosRU!
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Создайте, делитесь и анализируйте опросы с лёгкостью
          </p>
          <Link href="/create" passHref>
            <p className="inline-block bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-lg font-semibold">
              Создать новый опрос
            </p>
          </Link>
        </div>
      </section>

      {/* О нас Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">О нас</h2>
          <p className="text-lg text-gray-700 mb-8">
            OprosRU - это платформа для создания и проведения опросов. Мы
            предоставляем простой и интуитивно понятный интерфейс для создания
            опросов, получения и анализа данных, а также для взаимодействия с
            вашими пользователями.
          </p>
          <Link href="/info" passHref>
            <p className="text-blue-500 hover:text-blue-700 text-lg font-semibold">
              Узнать больше
            </p>
          </Link>
        </div>
      </section>

      {/* Преимущества Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Преимущества OprosRU</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Простота</h3>
              <p className="text-gray-700">
                Создавайте опросы за несколько минут с удобным и понятным
                интерфейсом.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Аналитика</h3>
              <p className="text-gray-700">
                Получайте подробные отчёты и статистику по результатам ваших
                опросов.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Безопасность</h3>
              <p className="text-gray-700">
                Ваши данные всегда будут в безопасности с нами, защита на высшем
                уровне.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Призыв к действию Section */}
      <section className="bg-blue-500 py-16 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Готовы создать свой первый опрос?
        </h2>
        <p className="text-lg mb-8">
          Присоединяйтесь к тысячам пользователей, создающих опросы на OprosRU!
        </p>
        <Link href="/create" passHref>
          <p className="inline-block bg-white hover:bg-gray-200 text-blue-500 py-3 px-6 rounded-full text-lg font-semibold">
            Начать создание
          </p>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
