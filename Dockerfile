FROM node:18-bookworm

RUN apt update && \
  apt install -y npm

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "out", "-l", "3000"]