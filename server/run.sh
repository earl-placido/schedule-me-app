#!/bin/bash
echo "Going to /usr/src/app"
cd /usr/src/app
echo "Installing dependencies"
npm install
echo "Starting server"
npm start