#!/usr/bin/env bash

PROJECT_ROOT="/home/ubuntu/app"
APP_NAME="app"
PM2_PATH="/home/ubuntu/.nvm/versions/node/v21.6.0/bin/pm2"

TIME_NOW=$(date +%c)

cd $PROJECT_ROOT

node -v
pm2 -v
npm -v
whoami

pm2 delete $APP_NAME
pm2 start npm --name $APP_NAME -- start

echo "$TIME_NOW > Deploy has been completed........"