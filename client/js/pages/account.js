const container = document.querySelector('.games_block');
const counter = document.getElementById('search_results');
const button = document.getElementById('view_more');
const searchInput = document.getElementById("searchInput");
const guidesStyles = document.getElementById("guidesStyles");

// accountUser.js
const avatarEl = document.querySelector(".left .avatar");
const usernameEl = document.querySelector(".left .username");
const h2El = document.querySelector(".left h2");
const descriptionEl = document.querySelector(".left .description p");
const followersEl = document.getElementById("followers");


// Info for current user
async function fetchUserInfo() {
    try {
        const res = await fetch("http://localhost:5001/users/me", {
            credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to fetch user info");

        const user = await res.json();

        // ajoute l'avatar de l'utilisateur ou une image par défaut
        avatarEl.src = user.avatar
            ? `http://localhost:5001/assets/avatars/${user.avatar}`
            : "assets/white.jpg";


            const rightAvatarImg = document.querySelector(".right-avatar");
            const rightNicknameAnchor = document.querySelector(".nickname a:first-child");

            if (rightAvatarImg) {
                rightAvatarImg.src = user.avatar 
                    ? `http://localhost:5001/assets/avatars/${user.avatar}` 
                    : "assets/white.jpg";
            }

            if (rightNicknameAnchor) {
                rightNicknameAnchor.textContent = user.username;
            }

            const violetDiv = document.querySelector(".violet");
            if (violetDiv) {
                if (user.cover) {
                    violetDiv.style.backgroundImage = `url('http://localhost:5001/assets/covers/${user.cover}')`;
                } else {
                    violetDiv.style.backgroundColor = "blueviolet";
                }
            }

        h2El.textContent = user.username;       // H2 in left block
        usernameEl.textContent = `@${user.username}`;
        descriptionEl.textContent = user.bio || "Bonjour Lorem...";  // bio from database or placeholder
        followersEl.textContent = `${user.followersCount || 0} Followers`;

    } catch (err) {
        console.error(err);
    }
}

fetchUserInfo();






let allGames = [];
let filteredGames = [];

const initial = 12;
const step = 6;

let currentIndex = 0;
let isExpanded = false;


async function fetchUserGames() {
  try {
    const response = await fetch(
      "http://localhost:5001/users/me/games-with-guides",
      { credentials: "include" }
    );

    if (!response.ok) throw new Error("Failed to load games");

    allGames = await response.json();
    filteredGames = [...allGames];

    renderInitial();

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Failed to load games.</p>";
  }
}

function renderInitial() {
    container.innerHTML = "";

    
    const slice = filteredGames.slice(0, initial);
    slice.forEach(renderCard);

    currentIndex = slice.length;
    isExpanded = false;
    button.textContent = "Show more";

    updateCounter();
}


function addNext() {
    const slice = filteredGames.slice(currentIndex, currentIndex + step);
    slice.forEach(renderCard);

    currentIndex += slice.length;

    if (currentIndex >= filteredGames.length) {
      button.textContent = "Hide";
      isExpanded = true;
    }

    updateCounter();
}



function updateCounter() {
    counter.textContent = `Showing ${currentIndex} of ${filteredGames.length} results`;
}




button.addEventListener("click", () => {
    if (!isExpanded) {
      addNext();
    } else {
      renderInitial();
    }
});




searchInput.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase().trim();

    filteredGames = allGames.filter(game =>
      game.title.toLowerCase().includes(value)
    );

    renderInitial();
});




function renderCard(game) {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="game" data-id="${game.id}">
        <div class="game-inner">
          <img src="assets/gamePhoto/${game.cover || "default.jpg"}" alt="${game.title}">
        </div>
      </div>
      `
    );
}




container.addEventListener("click", async (e) => {
    const card = e.target.closest(".game");
    if (!card) return;

    const gameId = card.dataset.id;

    // Save choosen game ID to localStorage for the guides page to access
    localStorage.setItem("selectedGameId", gameId);

    // Go to guides page for this game  
    window.location.href = "accountGuides.html";
});





fetchUserGames();




// import { jeux } from "../../Arrays/gamesArray.js";


// // ajouter des jeux et le button show
// const container = document.querySelector('.games_block');
// const counter = document.getElementById('search_results');
// const button = document.getElementById('view_more');
// const searchInput = document.getElementById("searchInput");

// function updateCounterAll() {
// let filteredGames = [...jeux]; // pour stocker les jeux filtrés, initialement tous les jeux


// const initial = 12;        // les jeux afichés premier
// let isExpanded = false;
// let currentIndex = 0;
// const step = 6;     // par combien de jeux on veux afficher 
// renderInitial();


// function updateCounter() {
//   counter.textContent = `Showing ${currentIndex} of ${filteredGames.length} results`;
// }


// currentIndex = initial; // pour afficher le nombre de jeux sur le nombre total de jeux
// updateCounter();



// // AFFICHER LES JEUX EN OUVRANT LE SITE

// function renderInitial() {
//   container.innerHTML = '';
//   filteredGames.slice(0, initial).forEach(renderCard);
//   currentIndex = Math.min(initial, filteredGames.length);
//   updateCounter();
// }



// // AJOUTER PLUS DE JEUX EN CLIQUANT LE BUTTON VIEW MORE
// // ajouter 6  jeux en clickant le button view more

// function addNext() {
//   const slice = filteredGames.slice(currentIndex, currentIndex + step);
//   slice.forEach(renderCard);
//   currentIndex += slice.length;

//   if (currentIndex >= filteredGames.length) {
//     button.textContent = "Hide";
//     isExpanded = true;
//   }

//   updateCounter();
// }




// // SI LE BUTTON EST CLIQUÉ, AFFICHER PLUS DE JEUX OU CACHER LES JEUX
// //   pour afficher les jeux en clickant le button view more et hide

//   button.addEventListener('click', () => {

//     if (!isExpanded) {
//       addNext();
//       updateCounter();
//     } else{
//       renderInitial();
//       currentIndex = initial;
//       isExpanded = false;
//       button.textContent = "Show more";
//       updateCounter();
//     }
// });



// // AFFICHER LES JEUX
// //pour afficher les jeux

// function renderCard(jeu) {
//     container.insertAdjacentHTML(        // pour ajouter des jeux a la fin d'array
//       "beforeend",                        //
//       `<div class="game ">
//         <div class="game-inner">
//                 <a href="${jeu.lien}"><img src="assets/gamePhoto/${jeu.image}" alt="${jeu.titre}"></a>
//         </div>
//       </div>`
//     );
// }


// // SEARCH BAR

// // fait search bar work
// // pour filtrer les jeux en fonction de la recherche
// searchInput.addEventListener("input", (event) => {
//   const value = event.target.value.toLowerCase().trim();

//   //
//   filteredGames = jeux.filter((jeu) =>
//     jeu.titre.toLowerCase().includes(value) 
//   );

//   container.innerHTML = ''; 

//   currentIndex = 0;
//   isExpanded = false;
//   button.textContent = "Show more";   // reset button text

//   renderInitial(); // afficher les jeux filtrés
// });
// }
// updateCounterAll();




// // BUTTONS ACTIVE BACKGROUND COLOR CHANGE
// //buttons allguides, favorites onclick active background color change

// const buttons = document.querySelectorAll(".button");


// buttons.forEach(button => {
//     button.addEventListener("click",() =>{
//         buttons.forEach(btn => btn.classList.remove("active")); 
//             button.classList.add("active");   
//     });
// });



