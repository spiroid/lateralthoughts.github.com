# www.lateral-thoughts.com

## Required setup

  1. set up https://npmjs.org/
  1. `npm install -g grunt-cli #sudo might be needed`
  1. make sure `git subtree` is a valid command

And then :squirrel:

```
 $ git checkout dev
 $ cd /path/to/lateralthoughts.github.com
 $ npm install
```

## Browsing locally

Easy as:

```
 $ git checkout dev
 $ cd /path/to/lateralthoughts.github.com
 $ grunt
```

And :surfer: to `http://localhost:8888`.

## Deploying

:exclamation: Be sure you know what you're doing.

:exclamation: Make sure `git subtree` is a valid command.

:poop: Do not push `generated` to this branch please :poop:

```
 $ git checkout dev
 # push your changes (not the generated ones) BEFORE, and then:
 $ ./deploy.sh
```

## Adding your blog feed

Add your blog feed URL to `js/main.js` (`dev` branch).
Preferably edit `blog.html` as well so people can choose to subscribe to your feed in particular.

## Pull request

:exclamation: Note you MUST send a Pull Request against `dev` and not `master` branch.
