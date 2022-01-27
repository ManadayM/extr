#! /bin/bash

# Reach scripts directory
cd "$(dirname ${BASH_SOURCE[0]})"

source ./setup.sh

# Navigate to the project root
cd ..

echo "Running app for $NODE_ENV"

if [ "$NODE_ENV" = "development" ]; then
  node_modules/.bin/nodemon ./dist
else
  node ./dist
fi
