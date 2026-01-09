FROM node:16.20.0-alpine3.16

WORKDIR /app

RUN apk update && apk add --no-cache \
  curl \
  bash \
  nano \
  git

COPY package*.json ./

COPY --chown=node:node . .

CMD [ "tail", "-f", "/dev/null" ]
