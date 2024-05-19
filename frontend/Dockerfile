FROM node:20.11-alpine

RUN mkdir -v /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
EXPOSE 3000
CMD npm run dev