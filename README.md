# Lateral-Toughts - nouveau site


L'outil utilisé pour bootstrapper le site est [yeoman](http://yeoman.io/) et en particulier sur le générateur [gulp-webapp](https://github.com/yeoman/generator-gulp-webapp)

La stack est composée des briques suivantes :
 * yeoman pour le scafolding
 * [gulp](http://gulpjs.com/) est l'outil de build
 * [bower](http://bower.io/) en charge de la résolution de dépendances


## Installation de l'environnement

### Node JS

Installer `node`.


#### NVM

Sous linux une méthode qui permet d'installer de manière isolée pour un utilisateur est de passer par [nvm](https://github.com/creationix/nvm).

Les "killer features" :
 * installation de plusieurs versions de node 
 * environnement isolé pour les packages nodes

Installation de nvm, par la [méthode manuelle](https://github.com/creationix/nvm#manual-install) :

> git clone https://github.com/creationix/nvm.git ~/.nvm

> source ~/.nvm/nvm.sh

> add this line to my ~/.bashrc, ~/.profile, or ~/.zshrc file to have it automatically sourced upon login.



### Librairies Javascript

A la racine du projet :

``` bash
    $ npm install
```


### Dépendances Javascript / CSS

Les libraires javascript et CSS nécessaires sont importées statiquement avec Bower.
Ces dépendances sont définies dans le fichier bower.json à la racine de ce projet.

En une ligne :

``` bash
    $ bower install
```


# Run

## Workflow de développement

```
    $ glup clean build watch
```

La règle ```watch``` lance un serveur http qui écoute sur le port 9000.

Les fichiers javascript et css ne sont pas minifiées pour faciliter le développement.

Dans ce mode, Gulp réagit aux modifications apportées sur les fichiers et nodifie le serveur que des modifications ont été apportées. Grâce à [livereload](http://livereload.com/) les changements sont reflétés en direct dans la navigateur sans avoir à rafraichir la page.


## Generation du site


```
    $ gulp
```

Qui est équivalent à ```gulp clean build ```.

L'ensemble des tâches sont exécutées et les ressources générées sont copiées dans le répertoire ```dist```. Le site est maintenant prêt à être déployé.

Pour en savoir en plus sur les commandes disponibles avec gulp, le plus simple est de naviguer dans le fichier [gulpfile.js](gulpfile.js) et de se familiariser avec la configuration, les plugins et les actions.