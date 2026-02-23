import { guides } from "../../Arrays/guidesArray.js";





            // AFFICHER ET UPDATE COUNTER

const button = document.getElementById('view_more');
const container = document.querySelector('.games_block');
const counter = document.getElementById('search_results');

const initial = 9;        // les jeux afichés premierement
let isExpanded = false;
let currentIndex = 0;
const step = 6;     // par combien de jeux on veux afficher 
renderInitial();


// afficher combien des jeux sur combien
function updateCounter() {
    counter.textContent = `Showing ${currentIndex} of ${guides.length} results`;
}

currentIndex = initial;
updateCounter();


function renderInitial() {                          // les jeux affichés en ouvrant le site
    container.innerHTML = '';
    guides.slice(0, initial).forEach(renderCard);       // prendre le tableau Guides et afficher initial (12) Guides
}


function addNext() {                    // les jeux affiché en clickant le button view 
    const slice = guides.slice(currentIndex, currentIndex + step);
    slice.forEach(renderCard);
    currentIndex += slice.length;
    updateCounter();

    if (currentIndex >= guides.length) {
        button.textContent = "Hide";
        updateCounter();
        isExpanded = true;
    }
}

function renderCard(guide) {
    container.insertAdjacentHTML(        // pour ajouter des jeux a la fin d'array
      "beforeend",                        //
        `<div class="game">
                <div class="game-inner">
                    <div class="text">
                        <a href="#">${guide.name}</a> 
                    </div>
                    
                    <a href="#"><img src="assets/gamePhoto/${guide.image}" alt="error"></a>
                    <div class="sousimg">
                        <div class="avatar">
                            <img src="assets/${guide.avatar}" alt="error">
                            <a href="account.html" class="name">${guide.userName}</a>
                        </div>
                        <p class="time">${guide.time}</p>
                    </div>
                    </div>
                </div>
            `
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






/*
let guideHTML = '';

guides.forEach(guide => {
    guideHTML += `
    <div class="game">
                <div class="text">
                    <a href="#">${guide.name}</a> 
                </div>
                
                <a href="#"><img src="${guide.image}" alt="error"></a>
                <div class="sousimg">
                    <div class="avatar">
                        <img src="${guide.avatar}" alt="error">
                        <a href="../AccountPage/account.html" class="name">${guide.userName}</a>
                    </div>
                    <p class="time">${guide.time}</p>
                </div>
            </div>
            <div class="pub">
                <a href="#"><img src="" alt=""></a>
            </div> 
    `;

    document.querySelector('.games_block').innerHTML = guideHTML;
});

*/




                // FAIRE DES BUTTONS ACTIVE 
const buttons = document.querySelectorAll(".button")
buttons.forEach(button => {
    button.addEventListener("click",() =>{
        buttons.forEach(btn => btn.classList.remove("active")); 
            button.classList.add("active");   
    });
});
