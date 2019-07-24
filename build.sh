#!/bin/bash

set -euxo pipefail

rm -rf node_modules
rm -rf package-lock.json
rm -rf dist

npm install ts-loader tslint tslint-loader typescript typings uglifyjs-webpack-plugin webpack --save-dev

npm i @fillr_letspop/desktop-autofill

webpack

mkdir dist/chrome
cp -R assets/* dist/chrome/ # copy chrome extension assets into place
cp dist/*.js dist/chrome/ # copy our bundles into chrome
cp dist/*.map dist/chrome/ # copy our source maps into chrome