# Récupération des données issues du formulaire

-> Au départ création d'un seul tableau qui récolte seulement les valeurs montants.
-> L'idéal, créer un tableau qui récoltent toutes les données pour faciliter leur récupération.

# Comment faire interagir le graph?

1.Décortiquer le code du graphique pour bien comprendre son sens.
2.Récupérer les données des tableaux de app.js

tentative d'utiliser import/export dataset:
const myDiv = document.querySelector(".operation");
console.log(myDiv.dataset);

on va essayer de réécrire la fonction qui permet de calculer les soldes pour stocker les données aux deux endroits, ds les 2 fichiers JS car je n'arrive pas à exporter importer mes données dans mon Graph.js

En fait on peut tout simplement appeler des fonctions d'un fichier js à un autre.
