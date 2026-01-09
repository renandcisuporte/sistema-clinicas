# =========================
# Build
# =========================
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

# RUN npx prisma migrate deploy

RUN npm run build

# =========================
# Runtime
# =========================
FROM builder AS production

WORKDIR /app

ENV NODE_ENV=production

# Instala o PM2 globalmente
RUN npm install -g pm2

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/ecosystem.config.js ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.env ./

EXPOSE 3004

# PM2 em modo runtime (essencial para Docker)
CMD ["pm2-runtime", "ecosystem.config.js"]

