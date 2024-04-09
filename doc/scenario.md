# Escape Game

## Créer un scénario

Pour créer un nouveau scénario `Exemple`, vous devez :

* créer le répertoire `./website/scenario/example/`
* mettre les images dans le répertoire `./website/scenario/example/image/`
* mettre les sons dans le répertoire `./website/scenario/example/sound/`
* créer le fichier de définition `./website/scenario/example/definition.js` avec la trame suivante : 

```js
class ScenarioExample extends Scenario {
    constructor() {
        super('example', 'Exemple');
    }

    load() {
        
    }
}
```

* modifier le fichier `./website/js/appBootstrap.js` pour

  * rajouter le chargement du nouveau fichier js que vous venez de créer dans la variable `jsFiles`
  * rajouter le scénario à la liste des scénarios disponibles dans la fonction `launchApp`

* compléter votre fichier de définition avec votre scénario en vous aidant des scénarios déjà existants.

***ATTENTION*** : n'utilisez que des images et des sons libres de droit.
