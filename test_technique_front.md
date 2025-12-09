# Test Technique Angular

Le candidat devra réaliser une application Angular comportant :
 
- un premier composant / page permettant d’effectuer une recherche sur une région via un formulaire.
 
- un second composant / page permettant d'afficher la liste des communes d'un département.



Le code produit devra être publié sur un repo github ou un équivalent.
 
## Premier composant :
 
- Le formulaire comporte un champ permettant de saisir le nom d’une région, ex : Normandie. Ce champ proposera le nom des régions en autocomplétion.
 
- L’utilisateur peut alors sélectionner une région.
 
- Pour la région sélectionnée, on récupère le code de la région.
 
- Une liste de tous les départements de la région sera affichée en dessous de la textbox.
 
- Si l'utilisateur clique sur un des départements de la liste on naviguera vers le second composant.

## Second composant :

 - Permet d'afficher la liste des communes du département sélectionné via son code département.
 

## Support technique : 

Trois APIs seront appelées :
 
- la première permettant de récupérer le nom des régions pour l’autocomplétion:

       https://geo.api.gouv.fr/regions?nom=nomDeLaRegion

- La deuxième permettant de récupérer la liste des départements d’une région :

       https://geo.api.gouv.fr/regions/{code région}/departements

- La troisième permettant de récupérer la liste des communes d’un départements :

       https://geo.api.gouv.fr/departements/{code departement}/communes

## Points d'attention :
- Tests
- Respect des bonnes pratiques
- Lisibilité et maintenabilité du code (clean code)
- Vous êtes libre de suggérer de nouvelles fonctionnalités (pagination, store, ...).