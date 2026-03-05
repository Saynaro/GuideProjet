// Define API_URL based on environment (development or production) to avoid CORS issues and relative path problems
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5001'
    : '';

// verify if user is authenticated, if not redirect to login page

async function checkAuth() {
    try {
        const res = await fetch(`${API_URL}/users/me`, {
            credentials: "include"
        });
        
        // if server responded with 401 (Unauthorized) or 403
        if (res.ok) {
            document.body.style.visibility = "visible";
        } else {
            window.location.replace("login.html");
        }
    } catch (err) {
        window.location.replace("login.html");
    }
}

// Check auth immediately on page load
checkAuth();


const searchResults = document.querySelector('.nombres');
const gameBlocks = document.querySelectorAll('.game');
searchResults.innerHTML = `Showing ${gameBlocks.length} results`;

// ajouter des jeux et le button show

const button = document.getElementById('view_more');
const counter = document.getElementById('search_results');
const container = document.querySelector('.game_block');
const create = document.querySelector('.create-lien');
const searchInput = document.getElementById("searchInput");



async function fetchUserInfo() {
    try {
        const res = await fetch(`${API_URL}/users/me`, {
            credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to fetch user info");

        const user = await res.json();

            const rightAvatarImg = document.querySelector(".right-avatar");
            const rightNicknameAnchor = document.querySelector(".nick a:first-child");

            if (rightAvatarImg) {
                rightAvatarImg.src = user.avatar 
                    ? `${API_URL}/assets/avatars/${user.avatar}` 
                    : "assets/white.jpg";
            }

            if (rightNicknameAnchor) {
                rightNicknameAnchor.textContent = user.display_name || user.username;
            }

    } catch (err) {
        console.error(err);
    }
}

fetchUserInfo();



let allGames = [];
let filteredGames = [];
const initial = 12;        // les jeux afichés premier
let isExpanded = false;      // est élargi?
let currentIndex = 0;       // index du jeux au moment
const step = 6;     // par combien de jeux on veux afficher 
renderInitial();


function updateCounter() {                      // combien des jeux affiché sur combien
    counter.textContent = `Showing ${currentIndex} of ${filteredGames.length} results`;
}

currentIndex = initial;
updateCounter();


function renderInitial() {                          // les jeux affichés en ouvrant le site
    container.innerHTML = '';
    
    const slice = filteredGames.slice(0, initial);
    slice.forEach(renderCard);

    currentIndex = slice.length;
    isExpanded = false;

    if (filteredGames.length <= initial) {
        button.style.display = "none";
    } else {
        button.style.display = "flex"; 
        button.textContent = "Show more";
    }
}


function addNext() {                    // les jeux affiché en touchant le button view 
  const slice = filteredGames.slice(currentIndex, currentIndex + step);            // prendre le tableau, combien jeux on veux (ici: 12).
  slice.forEach(renderCard);                                     //  A partir de la premiere element du array, et + 6 chaque fois

    currentIndex += slice.length;

    if (currentIndex >= allGames.length) {
        button.textContent = "Hide";
        updateCounter();
        isExpanded = true;
    }
}


// FETCH RECUPERER LES JEUX DE LA BDD

async function fetchGames() {
    try {
        const response = await fetch(`${API_URL}/main/afficheJeux`, {
            credentials: "include"
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        allGames = await response.json();   // array des objects
        filteredGames = [...allGames];      // ... pour faire une copie indépendante de allGames


        renderInitial();
        updateCounter();
    } catch (err) {
        console.error("Fetch failed:", err);
        container.innerHTML = `<p>Failed to load games.</p>`;
    }
}



async function renderCard(jeu) {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");
    gameDiv.dataset.titre = jeu.title.toLowerCase();
    gameDiv.dataset.id = jeu.id;   // Sauvegarder id du jeux
    gameDiv.dataset.img = jeu.cover;

    gameDiv.innerHTML = `
        <div class="game-inner">
            <a href="#"><img src="assets/gamePhoto/${jeu.cover}" alt="${jeu.title}"></a>
        </div>
    `;

    // Quand on click sur jeux
    gameDiv.addEventListener("click", () => {
        // Sauvegarder l'id en localStorage
        localStorage.setItem("selectedGameId", jeu.id);
        // transferer vers la page guide
        window.location.href = "gamePage.html";
    });

    container.appendChild(gameDiv);
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


searchInput.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase().trim();

    filteredGames = allGames.filter(game =>
        game.title.toLowerCase().includes(value)
    );

    renderInitial();
});


//buttons allguides, favorites onclick active background color change

const buttons = document.querySelectorAll(".button");


buttons.forEach(button => {
    button.addEventListener("click",() =>{
        buttons.forEach(btn => btn.classList.remove("active")); 
            button.classList.add("active");   
    });
});


fetchGames();

