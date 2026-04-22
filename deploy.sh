#!/bin/bash

set -e

echo "# CONTAINER UP"
docker compose up -d --build --force-recreate --remove-orphans --detach

# docker exec -i dclinica-node16 bash -lc '
# set -e

# echo "# Stop project"
# pm2 stop ecosystem.config.js || true
# sleep 1

# echo "# Installing dependencies"
# npm install
# sleep 1

# echo "# Run prisma migrations"
# npx prisma db push --accept-data-loss --skip-generate
# sleep 1

# echo "# Run prisma generate"
# npx prisma generate
# sleep 1

# echo "# Running build"
# npm run build
# sleep 1

# echo "# Running server PM2"
# pm2 start ecosystem.config.js --env production
# sleep 1

# echo "# Saving PM2"
# pm2 save
# sleep 1
# '
# echo "# Done"