#!/bin/bash

git checkout master
npm run build
git checkout --orphan gh-pages
git rm -rf .
cp -R build/* .
git add ./css
git add ./fonts
git add ./js
git add index.html
git commit -m "Publish"
git push
git rm -rf .
