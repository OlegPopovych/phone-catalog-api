# syntax = docker/dockerfile:1.2
FROM node:14.21.3

WORKDIR /usr/src/app

# Копіюємо файли package.json та package-lock.json для установки залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо .env файл безпосередньо в /etc/secrets/
COPY .env ./etc/secrets/.env

# Копіюємо решту файлів з поточного каталогу в контейнер
COPY . .

# Використовуємо secret file
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat ./etc/secrets/.env

# Запускаємо додаток
CMD ["npx", "ts-node", "./src/server.ts"]
