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

La version simple

```bash
    $ gulp
```

