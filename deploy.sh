#!/bin/bash

echo "# CONTAINER UP"
docker compose up -d --build --force-recreate --remove-orphans
