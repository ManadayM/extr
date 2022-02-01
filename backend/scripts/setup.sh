#! /bin/bash

# -z => checks env value
# -f => checks file existance

if [ -z "$NODE_ENV" ]; then
  export NODE_ENV='development'
  echo "NODE_ENV is not set! Defaulting to 'development'."
fi

[ -f "../env/$NODE_ENV.env" ] && source ../env/$NODE_ENV.env

export APP_VERSION=$(npm run env | grep npm_package_version | cut -d '=' -f 2)

# Check if the key environment variables exist.
# In this list we only check the environment variable configuration
# which will be necessary to spin up the environment
for name in DB_USER DB_PASSWORD JWT_SECRET; do
  eval "[ -z \"\${$name}\" ]" && echo "Error: \$$name not set" && ERR=1
done

if [ "$ERR" ]; then
  echo
  echo "Could not find environment variables for $NODE_ENV! Please add them to ../env/$NODE_ENV.env - use ../env/sample.env as a guide."
  exit 1
fi
