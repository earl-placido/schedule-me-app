#!/bin/bash

echo "Going to /usr/src/app"
cd /usr/src/app

echo "Setting up environment variables"
ENV="$(/opt/elasticbeanstalk/bin/get-config environment -k ENV)"
SERVER_PORT="$(/opt/elasticbeanstalk/bin/get-config environment -k SERVER_PORT)"

DB_HOST="$(/opt/elasticbeanstalk/bin/get-config environment -k RDS_HOSTNAME)"
DB_NAME="$(/opt/elasticbeanstalk/bin/get-config environment -k RDS_DB_NAME)"
DB_USER="$(/opt/elasticbeanstalk/bin/get-config environment -k DB_USER)"
DB_PASSWORD="$(/opt/elasticbeanstalk/bin/get-config environment -k DB_PASSWORD)"
DB_ROOT_USER="$(/opt/elasticbeanstalk/bin/get-config environment -k RDS_USERNAME)"
DB_ROOT_PASSWORD="$(/opt/elasticbeanstalk/bin/get-config environment -k RDS_PASSWORD)"

echo "
NODE_ENV=$ENV
SERVER_PORT=$SERVER_PORT

DB_NAME=$DB_NAME
DB_HOST=$DB_HOST
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
MYSQL_ROOT_USER=$DB_ROOT_USER
MYSQL_ROOT_PASSWORD=$DB_ROOT_PASSWORD
" > .env

echo "Installing dependencies"
npm install
echo "Starting server"
npm start