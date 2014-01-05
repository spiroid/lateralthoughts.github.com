#!/bin/bash
rm -rf generated
grunt deploy
git add -A generated
git commit -m "New deploy!"
git branch -D deploy
git subtree split --prefix=generated --branch deploy
git push -f origin deploy:master
git reset --hard origin/dev
