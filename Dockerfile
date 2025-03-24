# образ
FROM node:22.14.0

# рабочая директория
WORKDIR /app
# копируем указанные файлы в корень контейнера
COPY package.json package-lock.json ./
# устанавливаем зависимости
RUN npm install --legacy-peer-deps
# копируем остальные файлы в корень контейнера
COPY . .
# устанавливаем переменную
ENV NODE_ENV=production
# выполняем сборку приложения
RUN npm run build

# выставляем порт
EXPOSE 3000
# запускаем приложение
CMD ["npm", "start"]
