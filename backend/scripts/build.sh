#! /bin/bash

# Navigate to the scripts directory.
cd "$(dirname ${BASH_SOURCE[0]})"

# Navigate to root of the project.
cd ..

# Remove currently generated dist folder if it exists
if [ -d "dist" ]; then
  rm -r dist
fi

echo "[INFO]: build started."
# Generate the build using type script compiler
./node_modules/.bin/tsc
echo "[INFO]: build finished. Check ./dist directory for build artifacts."
