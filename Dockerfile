FROM node:7.0.0

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm config set registry https://registry.npm.taobao.org &&\
  npm config list &&\
  npm install pm2 yarn -g

ENV HOME=/home/app
ENV NODE_ENV=production
ENV APP_PATH = $HOME/rudy/

COPY package.json $APP_PATH
RUN chown -R app:app $HOME/*

USER app
WORKDIR $APP_PATH
RUN npm config set registry https://registry.npm.taobao.org &&\
  npm config list &&\
  npm install
# RUN yarn config set registry https://registry.npm.taobao.org &&\
#   yarn config list &&\
#   yarn instal

USER root
COPY . $APP_PATH
RUN chown -R app:app $HOME/*
USER app

CMD pm2-docker bin/server.js