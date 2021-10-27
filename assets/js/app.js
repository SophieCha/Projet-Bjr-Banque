console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});

/*Création d'un tableau d'objets pour y injecter à chaque fois les données du formulaire,
à chaque submit on insèrera l'objet: dataInput */

const dataInputs = [];
let dataInput = {};

let solde = 0;

//Array pour conserver les valeurs du solde
const soldeArray = [];

/*On récupère d'abord les données du formulaire que l'on convertit en variables et que l'on insère dans l'objet puis dans le tableau d'objets.
On injecte ensuite les variables de l'objet dans une div HTML, à chaque submit, une div est ajoutée.*/

selectForm = document.querySelector("#operationForm");

selectForm.addEventListener("submit", function (event) {
  event.preventDefault();

  //ici on cible les données du formulaire
  let titre = document.querySelector("#titre").value;

  let operator = document.querySelector("#operator").value;

  let description = document.querySelector("#desc").value;

  let montant = document.querySelector("#montant").value;

  //puis on les insère dans l'objet dataInput{}.
  dataInput = {
    titre: `${titre}`,
    operator: `${operator}`,
    montant: `${montant}`,
    description: `${description}`,
  };

  //On insère l'objet (qui comprend les valeurs) dans un tableau
  dataInputs.push(dataInput);

  //calcul du pourcentage ici pr pouvoir être inséré dans la div
  calculPercent();

  let containerData = document.querySelector("#containerData");

  if (operator === "credit") {
    containerData.innerHTML += `<div class="operation credit" >
  <div class="grid-x grid-padding-x align-middle">
  <div class="cell shrink">
  <div class="picto">
  <img src="./assets/images/sac-dargent.png" alt="credit" />
  </div>
  </div>
  <div class="cell auto">
  <div>
  <h2 id="titreInput"> ${dataInput.titre} </h2>
  <small id="commentaireInput"> ${dataInput.description} </small>
  </div>
  </div>
  <div class="cell small-3 text-right">
  <div>
  <p class="count" id="montantInput">${dataInput.montant}€</p>
  <small>${nouveauPercent}%</small>
  </div>
  </div>
  </div>
  </div>`;
  } else {
    containerData.innerHTML += `<div class="operation debit" >
  <div class="grid-x grid-padding-x align-middle">
  <div class="cell shrink">
  <div class="picto">
  <img src="./assets/images/depenses.png" alt="dedit" />
  </div>
  </div>
  <div class="cell auto">
  <div>
  <h2>${dataInput.titre}</h2>
  <small>${dataInput.description}</small>
  </div>
  </div>
  <div class="cell small-3 text-right">
  <div>
  <p class="count">${dataInput.montant}€</p>
  <small>${nouveauPercent}%</small>
  </div>
  </div>
  </div>
  </div>`;
  }

  changeSolde();

  goodOuPasGood();
  console.log(dataInputs);
  console.log(dataInput);
});

/* fonction  qui calcul le solde
  -> if  calcule le solde à chaque insertion d'un nouveau montant + à chaque fois insdertion du solde dans soldeArray.
  -> puis modification de l'affichage du solde dans le HTML*/
function changeSolde() {
  if (dataInput.operator === "credit") {
    solde += parseInt(dataInput.montant);
    soldeArray.push(solde);
  }
  if (dataInput.operator === "debit") {
    solde -= parseInt(dataInput.montant);
    soldeArray.push(solde);
  }
  console.log(solde);
  const selectSolde = document.querySelector("#solde");
  selectSolde.innerHTML = solde + "€";
}

//fonction pour modifier la phrase sous le solde on est bien / on est pas bien
function goodOuPasGood() {
  let selectGood = document.querySelector(".good");
  let selectBad = document.querySelector(".bad");
  if (solde < 0) {
    selectGood.style.display = "none";

    selectBad.style.display = "block";
  } else {
    selectGood.style.display = "block";

    selectBad.style.display = "none";
  }
}

//Calculer le pourcentage qui correspond à la proportion du crédit/débit par rapport au solde
// //   (montant*100)/solde avant calcul du nouveau solde
function calculPercent() {
  if (dataInputs.length <= 1) {
    nouveauPercent = 100;
  } else {
    a = parseInt(dataInput.montant);

    b = soldeArray[soldeArray.length - 1];

    nouveauPercent = Math.abs((a * 100) / b).toFixed(2);
  }
}

/*fonction qui permet d'afficher uniquement les débits ou les crédits.
  On va essayer de manipuler tout ça en faisant apparaître et disparaître des classes en jouant 
//   sur la visibilité/ display */

// const toutPressed = document.querySelector("#toutPressed");
// const creditPressed = document.querySelector("#creditPressed");
// const debitPressed = document.querySelector("#debitPressed");

// creditPressed.addEventListener("click", function afficherCredit() {
//   creditPressed.setAttribute("class", "active");
//   toutPressed.removeAttribute("class");
//   debitPressed.removeAttribute("class");

//   const selectDebit = document.querySelector(".debit");
//   selectDebit.setAttribute("class", "invisible");
//   const selectCredit = document.querySelector(".credit");
//   selectCredit.classList.remove("invisible");
// });

// debitPressed.addEventListener("click", function afficherDebit() {
//   debitPressed.setAttribute("class", "active");
//   toutPressed.removeAttribute("class");
//   creditPressed.removeAttribute("class");

//   const selectCredit = document.querySelector(".credit");
//   selectCredit.setAttribute("class", "invisible");
//   const selectDebit = document.querySelector(".debit");
//   selectDebit.classList.remove("invisible");
// });

// toutPressed.addEventListener("click", function afficherTout() {
//   toutPressed.setAttribute("class", "active");
//   creditPressed.removeAttribute("class");
//   debitPressed.removeAttribute("class");
//   const selectDebit = document.querySelector(".debit");
//   selectDebit.classList.remove("invisible");
//   const selectCredit = document.querySelector(".credit");
//   selectCredit.classList.remove("invisible");
// });
