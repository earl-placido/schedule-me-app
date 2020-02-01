#!/bin/bash

echo "Going to /usr/src/app"
cd /usr/src/app

echo "Installing dependencies"
npm install

echo "Initializing database"
npm run db:init

echo "Starting server"
npm start