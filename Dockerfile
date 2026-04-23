FROM node:16.20.2-alpine AS base
WORKDIR /app
RUN apk update && apk add --no-cache libc6-compat git bash

FROM base AS deps
COPY package*.json ./
RUN npm install

FROM deps AS builder
COPY . .
RUN npx prisma generate
RUN npm run build
RUN npm prune --omit=dev

FROM base AS runner
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/ecosystem.config.js ./
COPY --from=builder /app/public ./public

RUN npm install -g pm2
RUN pm2 install pm2-logrotate

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]