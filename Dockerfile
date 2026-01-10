# =========================
# Build
# =========================
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build

# =========================
# Runtime
# =========================
FROM node:16-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# # Instala o PM2 globalmente
# RUN npm install -g pm2

COPY --from=builder /app/package*.json ./
RUN npm ci --only=dev

COPY --from=builder /app/.env ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/ecosystem.config.js ./
COPY --from=builder /app/next.config.js ./

RUN npx prisma generate

EXPOSE 3004

# # PM2 em modo runtime (essencial para Docker)
# CMD ["pm2-runtime", "ecosystem.config.js"]
CMD ["npm", "run", "start", "--", "-p", "3004"]

