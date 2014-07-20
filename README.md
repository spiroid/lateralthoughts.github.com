# Lateral-Toughts - nouveau site


L'outil utilisé pour bootstrapper le site est [yeoman](http://yeoman.io/) et en particulier sur le générateur [gulp-webapp](https://github.com/yeoman/generator-gulp-webapp)

La stack est composée des briques suivantes :
 * yeoman pour le scafolding
 * [gulp](http://gulpjs.com/) est l'outil de build
 * [bower](http://bower.io/) en charge de la résolution de dépendances


# Installation de l'environnement

## Node JS

Installer `node`.


### NVM

Sous linux une méthode qui permet d'installer de manière isolée pour un utilisateur est de passer par [nvm](https://github.com/creationix/nvm).

Les "killer features" :
 * installation de plusieurs versions de node 
 * environnement isolé pour les packages nodes

Installation de nvm, par la [méthode manuelle](https://github.com/creationix/nvm#manual-install) :

> git clone https://github.com/creationix/nvm.git ~/.nvm

> source ~/.nvm/nvm.sh

> add this line to my ~/.bashrc, ~/.profile, or ~/.zshrc file to have it automatically sourced upon login.



## Librairies Javascript

A la racine du projet :

``` bash
    $ npm install
```


## Dépendances Javascript / CSS

Les libraires javascript et CSS nécessaires sont importées statiquement avec Bower.
Ces dépendances sont définies dans le fichier bower.json à la racine de ce projet.

En une ligne :

``` bash
    $ bower install
```

# VirtualBox et Vagrant

En alternative à l'installation complète de l'environnement sur un poste de développement, il est possible de créer une machine virtuelle grâce à Vagrant.
Cette machine virtuelle contiendra alors toutes les librairies et les applications nécessaires, nodejs, bower, gulp ...

## Génération de la VM

```
   $ vagrant up
```

## Lancement du serveur HTTP

```
   $ vagrant ssh
   $ cd /vagrant
   $ gulp watch
```

# Workflow de développement

## Serveur HTTP local
```
    $ gulp watch
```

Puis :surfer: sur `http://localhost:9000`.

La règle ```watch``` lance un serveur http qui écoute sur le port 9000.

Les fichiers javascript et css ne sont pas minifiées pour faciliter le développement.

Dans ce mode, Gulp réagit aux modifications apportées sur les fichiers et nodifie le serveur que des modifications ont été apportées. Grâce à [livereload](http://livereload.com/) les changements sont reflétés en direct dans la navigateur sans avoir à rafraichir la page.

## Ajout d'icônes

La solution utilisée pour les icônes est une "icofont". C'est donc une police dont les caractères sont des icônes.
Il n'y a pas encore de méthode pour générer automatiquement cette police. Il faut donc procéder manuellement.

* Mettres toutes les icônes **au format SVG** dans le dossier ```app/icons```.
* Aller sur [Icomoon](http://icomoon.io/app/#/select).
    * Clic sur ```Import icons```, et impoter toutes les icones du dossier ```app/icons```.
    * Sélectionner les icones ajoutées (elles deviennent oranges).
    * Clic sur ```Font``` en bas de l'écran.
    * Clic sur ```Download```.
* Créer un dossier ```icomoon```.
* Dézipper le fichier ```icomoon.zip``` dedans.
* Copier les quatre fichiers du dossier ```icomoon/fonts``` vers ```LE_PROJET/app/fonts```
* Copier le contenu du fichier ```icomoon/style.css``` dans le fichier ```LE_PROJET/app/styles/utils/pictos.less```.
* Dans le fichier ```pictos.less```, dans la balise ```@font-face```, metre tous les chemins en absolu (donc en ajoutant un ```/``` devant).

# Generation du site


```
    $ gulp
```

Qui est équivalent à ```gulp clean build ```.

L'ensemble des tâches sont exécutées et les ressources générées sont copiées dans le répertoire ```dist```. Le site est maintenant prêt à être déployé.

Pour en savoir en plus sur les commandes disponibles avec gulp, le plus simple est de naviguer dans le fichier [gulpfile.js](gulpfile.js) et de se familiariser avec la configuration, les plugins et les actions.


# Deploying

TODO: JDY, section à revoir

:exclamation: Be sure you know what you're doing.

:exclamation: Make sure `git subtree` is a valid command.

:poop: Do not push `generated` to this branch please :poop:

 $ git checkout dev
 # push your changes (not the generated ones) BEFORE, and then:
 $ ./deploy.sh
```

# Adding your blog feed

Add your blog feed URL to `js/main.js` (`dev` branch).
Preferably edit `blog.html` as well so people can choose to subscribe to your feed in particular.

# Pull request

:exclamation: Note you MUST send a Pull Request against `dev` and not `master` branch.
