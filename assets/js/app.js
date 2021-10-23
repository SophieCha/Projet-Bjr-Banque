console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});

//Création d'un tableau pour y injecter à chaque fois le crédit ou débit
let montantInputs = [];

let nouveauPercent = 0;

//On récupère d'abord les données du formulaire que l'on convertis en variables
//On injecte ensuite ces variables dans une div HTML, à chaque submit, une div est ajoutée.

selectForm = document.querySelector("#operationForm");
selectForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let titre = document.querySelector("#titre").value;
  console.log(titre);

  let operator = document.querySelector("#operator").value;
  console.log(operator);

  let description = document.querySelector("#desc").value;
  console.log(description);

  let montant = document.querySelector("#montant").value;
  console.log(montant);

  let containerData = document.querySelector("#containerData");

  if (operator == "credit") {
    montantInputs.push(parseInt(montant));
    console.log(montantInputs);
    sumArray();
    calculPercent();
    containerData.innerHTML += `<div class="operation credit">
<div class="grid-x grid-padding-x align-middle">
<div class="cell shrink">
<div class="picto">
<img src="./assets/images/sac-dargent.png" alt="credit" />
</div>
</div>
<div class="cell auto">
<div>
<h2 id="titreInput"> ${titre} </h2>
<small id="commentaireInput"> ${description} </small>
</div>
</div>
<div class="cell small-3 text-right">
<div>
<p class="count" id="montantInput">${montant}€</p>
<small>${nouveauPercent}%</small>
</div>
</div>
</div>
</div>`;
  } else {
    montantInputs.push(-montant);
    console.log(montantInputs);
    sumArray();
    calculPercent();
    containerData.innerHTML += `<div class="operation debit">
<div class="grid-x grid-padding-x align-middle">
<div class="cell shrink">
<div class="picto">
<img src="./assets/images/depenses.png" alt="dedit" />
</div>
</div>
<div class="cell auto">
<div>
<h2>${titre}</h2>
<small>${description}</small>
</div>
</div>
<div class="cell small-3 text-right">
<div>
<p class="count">${montant}€</p>
<small>${nouveauPercent}%</small>
</div>
</div>
</div>
</div>`;
  }
});

/*Ici on veut créer une fonction qui permet de calculer et d'afficher le solde total:
On ajoute chaque élément du tableau inputMontants.*/
let soldeArray = []; //liste pour conserver les valeurs du solde
function sumArray() {
  let solde = 0;

  for (let i = 0; i < montantInputs.length; i++) {
    solde += montantInputs[i];
  }
  console.log(solde);

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
  goodOuPasGood();

  //ajout du solde dans le tableau soldeArray
  soldeArray.push(solde);

  //modification du nouveau solde dans le HTML
  const selectSolde = document.querySelector("#solde");
  selectSolde.innerHTML = solde += "€";
}

//Calculer le pourcentage qui correspond à la proportion du crédit/débit par rapport au solde
//   (montant*100)/solde avant calcul du nouveau solde
function calculPercent() {
  let ancienTotal = 0;
  if (montantInputs.length <= 1) {
    nouveauPercent = 100;
  } else {
    for (let a = 0; a < montantInputs.length - 1; a++) {
      ancienTotal += montantInputs[a];
    }
    nouveauPercent = Math.abs(
      ((montantInputs[montantInputs.length - 1] * 100) / ancienTotal).toFixed(2)
    );
  }

  console.log(nouveauPercent);
}

// }
