#!/bin/bash

git checkout master
npm run build
git checkout gh-pages
git rm -rf .
cp -R build/* .
git add ./css
git add ./fonts
git add ./js
git add index.html
git commit -m "Publish"
git push origin/gh-pages
git rm -rf .
rm -rf node_modules/
rm -rf build/
