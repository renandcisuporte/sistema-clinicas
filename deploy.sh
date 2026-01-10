#!/bin/bash

set -e
cd /home/dclinica/public_html/ || true

echo '# Stop project'
pm2 stop ecosystem.config.js

echo "# Installing dependencies"
npm ci --only=production

echo "# Run prisma migrations"
npx prisma db push deploy --accept-data-loss --skip-generate

echo "# Run prisma generate"
npx prisma generate

echo "# Running build"
npm run build

echo "# Running server PM2"
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
