FROM node:16.20.2-alpine

WORKDIR /app

RUN apk update && apk add --no-cache \
    libc6-compat \
    git \
    bash

RUN npm install -g pm2

RUN pm2 install pm2-logrotate

CMD ["sh"]