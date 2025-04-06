# docker/api/Dockerfile
FROM node:16.19.1

ENV APP_HOME=/app
ENV PORT=3000

RUN apt-get update

RUN mkdir ${APP_HOME}
COPY . ${APP_HOME}

WORKDIR ${APP_HOME}

RUN npm install

EXPOSE ${PORT}
