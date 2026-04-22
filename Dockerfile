FROM node:16.20.2-alpine AS builder
WORKDIR /app
RUN apk update && apk add --no-cache libc6-compat git bash

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build
RUN npm prune --omit=dev

FROM node:16.20.2-alpine AS runner
WORKDIR /app

RUN npm install -g pm2
RUN pm2 install pm2-logrotate

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3004

COPY --from=builder /app/prisma ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/ecosystem.config.js ./
COPY --from=builder /app/public ./public

EXPOSE 3004

CMD ["pm2-runtime", "start", "ecosystem.config.js"]