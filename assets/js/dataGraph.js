// <block:setup:1>

const datapoints = []; //SC:liste soldes
const DATA_COUNT = datapoints.length; //pourquoi un +2?
/* on enlève le 2, sinon retourne le titre 2 tps en retard,
(permet de faire "avancer" le graphique qd pas de valeur dans label?)*/
const labels = []; //liste des "titres" à chaque montant
for (let i = 0; i < DATA_COUNT; ++i) {
  labels.push(i.toString());
}
const data = {
  labels: labels,
  datasets: [
    {
      label: "Compte",
      data: datapoints,
      borderColor: "purple",
      //   fill: true,
      cubicInterpolationMode: "monotone",
    },
  ],
};
// </block:setup>

// <block:config:0>
const config = {
  type: "line",
  data: data,
  options: {
    elements: {
      point: {
        radius: 0,
      },
    },
    responsive: true,
    plugins: {
      legend: false,
      //   title: {
      //     display: true,
      //     text: "Chart.js Line Chart - Cubic interpolation mode",
      //   },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  },
};

/*Le contexte du canevas HTML */
context = document.getElementById("myChart").getContext("2d"); //permet de cibler le graphique html
/* Création du graphique */
chart = new Chart(context, config);

/* Générer des données aléatoires */
//sc: Cette fonction n'a plus lieu d'être aprèes modif, car chiffres aléatoires vont être remplacés par les données récoltées
// function generateData() {
//   randomTemperature = (Math.random() * Math.floor(50)).toFixed(2); // Deux chiffres après la virgule
//   addTemperature(new Date().toLocaleTimeString(), randomTemperature);
// }

// /*sc: je ne comprends pas ce que vient faire cette fonction, modèle à suivre pour la suite?
//       qd on la supprime cela n'a pas d'influence sur le graphique*/
// function addTemperature(time, temperature) {
//   /* Ajoute la valeur en X */
//   config.data.labels.push(time);

//   /* Ajoute la valeur */
//   config.data.datasets[0].data.push(temperature);

//   /* Rafraichir le graphique */
//   chart.update();
// }

/*on reproduit la fonction qui permet d'obtenir le solde et le titre (car je n'arrive pas à importer mon tableau de valeur),
 on va l'utiliser pour remplir le tableau datapoints*/

//  let dataMontant;
// datapoints.push(soldeArray[0]);

selectForm = document.querySelector("#operationForm");
selectForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (soldeArray.length > 0) {
    let i = soldeArray.length - 1;
    datapoints.push(soldeArray[i]);
  }

  console.log(datapoints);

  let dataTitre = document.querySelector("#titre").value;
  // console.log(dataTitre);
  labels.push(dataTitre);
  // console.log(labels);
  chart.update();
});
