import { jeux } from "../Arrays/gamesArray.js";
const searchResults = document.querySelector('.nombres');
const gameBlocks = document.querySelectorAll('.game');
searchResults.innerHTML = `Showing ${gameBlocks.length} results`;
 


    




// ajouter des jeux et le button show


const button = document.getElementById('view_more');
const counter = document.getElementById('search_results');
const container = document.querySelector('.game_block');

const initial = 12;        // les jeux afichés premier
let isExpanded = false;      // est élargi?
let currentIndex = 0;       // index du jeux au moment
const step = 6;     // par combien de jeux on veux afficher 
renderInitial();


function updateCounter() {                      // combien des jeux affiché sur combien
  counter.textContent = `Showing ${currentIndex} of ${jeux.length} results`;
}

currentIndex = initial;
updateCounter();


function renderInitial() {                          // les jeux affichés en ouvrant le site
  container.innerHTML = '';
  jeux.slice(0, initial).forEach(renderCard);
}


function addNext() {                    // les jeux affiché en touchant le button view 
  const slice = jeux.slice(currentIndex, currentIndex + step);            // prendre le tableau, combien jeux on veux (ici: 12).
  slice.forEach(renderCard);                                     //  A partir de la premiere element du array, et + 6 chaque fois

  currentIndex += slice.length;

  if (currentIndex >= jeux.length) {
    button.textContent = "Hide";
    updateCounter();
    isExpanded = true;
  }
}

function renderCard(jeu) {
    container.insertAdjacentHTML(        // pour ajouter des jeux a la fin d'array
      "beforeend",                        //
      `<div class="game" data-titre="${jeu.titre.toLowerCase()}" data-img="${jeu.image}"> 
        <div class="game-inner">
            <a href="${jeu.lien}"><img src="../GamePhoto/${jeu.image}" alt="${jeu.titre}"></a>
        </div>
      </div>`
    );
  }


button.addEventListener('click', () => {

    if (!isExpanded) {
      addNext();
      updateCounter();
    } else{
      renderInitial();
      currentIndex = initial;
      isExpanded = false;
      button.textContent = "Show more";
      updateCounter();
    }
});




//buttons allguides, favorites onclick active background color change

const buttons = document.querySelectorAll(".button");


buttons.forEach(button => {
    button.addEventListener("click",() =>{
        buttons.forEach(btn => btn.classList.remove("active")); 
            button.classList.add("active");   
    });
});