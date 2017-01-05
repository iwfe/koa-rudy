FROM node:6.9.1

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm config set registry https://registry.npm.taobao.org &&\
  npm config list &&\
  npm install pm2 yarn -g

ENV HOME=/home/app
ENV NODE_ENV=production

COPY package.json $HOME/rudy/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/rudy
RUN npm config set registry https://registry.npm.taobao.org &&\
  npm config list &&\
  npm install
# RUN yarn config set registry https://registry.npm.taobao.org &&\
#   yarn config list &&\
#   yarn instal

USER root
COPY . $HOME/rudy
RUN chown -R app:app $HOME/*
USER app

CMD NODE_ENV=prod pm2-docker bin/server.js