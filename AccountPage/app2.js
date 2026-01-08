import { jeux } from "../Arrays/gamesArray.js";


// ajouter des jeux et le button show
const container = document.querySelector('.games_block');
const counter = document.getElementById('search_results');
const button = document.getElementById('view_more');


const initial = 12;        // les jeux afichés premier
let isExpanded = false;
let currentIndex = 0;
const step = 6;     // par combien de jeux on veux afficher 
renderInitial();


function updateCounter() {
  counter.textContent = `Showing ${currentIndex} of ${jeux.length} results`;
}

currentIndex = initial;
updateCounter();


function renderInitial() {                          // les jeux affichés en ouvrant le site
  container.innerHTML = '';
  jeux.slice(0, initial).forEach(renderCard);
  
}


function addNext() {                    // les jeux affiché en clickant le button view 
  const slice = jeux.slice(currentIndex, currentIndex + step);
  slice.forEach(renderCard);
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
      `<div class="game ">
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