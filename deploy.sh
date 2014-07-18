#!/bin/bash
# Remove old generated files if they exist
rm -rf generated

# Launch build command
gulp

# Copy generated website to the generated folder
cp -a dist generated

# New commit
git add -A generated
git commit -m "New deploy!"

# Remove deploy branch
git branch -D deploy

# Subtree
git subtree split --prefix=generated --branch deploy

# Propagate modification to the remote repository
git push -f origin deploy:master

# Reset
git reset --hard origin/dev
