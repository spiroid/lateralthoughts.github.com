#!/bin/bash

# Get current branch
BRANCH=`git symbolic-ref --short HEAD`

# Remove old generated files if they exist
rm -rf generated

# Save uncommited changes
git stash save -u 'Before deployement'

# Launch build command
gulp

# Copy generated website to the generated folder
cp -a dist generated

# New commit
git add -A generated
git commit -m "New deploy!"

# Remove old deploy branch
git branch -D deploy

# Subtree - create a temporary branch deploy from the content of the generated directory
git subtree split --prefix=generated --branch deploy

# Sync master locally
git checkout master && git pull origin master

# Merge all modifications in master branch
git checkout deploy && git merge -s ours master
git checkout master && git merge deploy

# Push modifications to the remote repository, on master branch
git push origin master

# restore old context
git checkout ${BRANCH}
git reset --hard HEAD^
git stash pop
