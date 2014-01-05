# www.lateral-thoughts.com

## Required setup

  1. set up https://npmjs.org/
  1. optional (unless you wanna deploy changes): make sure `git subtree` is a valid command

And then :squirrel:

```
 $ cd /path/to/lateralthoughts.github.com
 $ npm install
```

## Browsing locally

Easy as:

```
 $ cd /path/to/lateralthoughts.github.com
 $ grunt
```

And :surfer: to `http://localhost:8888`.

## Deploying

:exclamation: Be sure you know what you're doing.

```
 # push your changes (not the generated ones) BEFORE, and then:
 $ ./deploy.sh
```

## Adding your blog feed

Add your blog feed URL to `js/main.js`.
Preferably edit `blog.html` as well so people can choose to subscribe to your feed in particular.
