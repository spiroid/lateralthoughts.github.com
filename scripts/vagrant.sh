#!/bin/bash

echo "-- Update package definitions --"
sudo apt-get update
sudo apt-get install -y git-core curl wget

echo "-- Install image manipulation libraries --"
sudo apt-get install -y optipng pngquant gifsicle


echo "-- Install project's packages --"
echo "--- Switching to Vagrant user ---"

if [ -f "/vagrant/package.json" ]
    then
        echo "--- Installing and configuring nvm ---"
        wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
        source ~/.profile
        nvm install 0.10.24
        nvm alias default 0.10.24

        cd /vagrant
        npm install
fi

if [ -f "/vagrant/bower.json" ]
    then
        if ! hash bower 2>/dev/null; then
            echo "--- Installing and configuring bower globally ---"
            npm install -g bower
        fi

        cd /vagrant
        bower cache clean
        bower install
fi

if [ -f "/vagrant/gulpfile.js" ]
    then
        if ! hash gulp 2>/dev/null; then
            echo "--- Installing and configuring gulp globally ---"
            npm install -g gulp
        fi
fi

echo "--- Run gulp watch ---"

if [ -f "/vagrant/gulpfile.js" ]; then
    cd /vagrant
    gulp
fi
