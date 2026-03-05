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


let currentUserId = null; // Une variable globale pour stocker l'ID de l'utilisateur actuellement connecté.
const params = new URLSearchParams(window.location.search);
const profileId = params.get("id");


// Define API endpoints based on whether we're viewing our own profile or someone else's
const userUrl = profileId 
    ? `${API_URL}/users/${profileId}` 
    : `${API_URL}/users/me`;

// For fetching games with guides, we also need to differentiate between own profile and others'
const gamesUrl = profileId 
    ? `${API_URL}/users/${profileId}/games-with-guides` 
    : `${API_URL}/users/me/games-with-guides`;


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
        // 1. D'abord, on récupère les infos de l'utilisateur actuellement connecté pour obtenir son ID
        const authRes = await fetch(`${API_URL}/users/me`, { credentials: "include" });
        const me = await authRes.json();
        currentUserId = me.id; // Stocker l'ID de l'utilisateur connecté dans la variable globale



        const rightAvatarImg = document.querySelector(".right-avatar");
        const rightNicknameAnchor = document.querySelector(".nickname a:first-child");

        if (rightAvatarImg) {
            rightAvatarImg.src = me.avatar 
                ? `${API_URL}/assets/avatars/${me.avatar}` 
                : "assets/white.jpg";
        }

        if (rightNicknameAnchor) {
            rightNicknameAnchor.textContent = me.display_name || me.username;
        }

        // 2. Load profile info( peut etre notre propre profil ou celui d'un autre utilisateur)
        const res = await fetch(userUrl, { credentials: "include" });

        if (!res.ok) throw new Error("Failed to fetch user info");

        const user = await res.json();

        // ajoute l'avatar de l'utilisateur ou une image par défaut
        avatarEl.src = user.avatar
            ? `${API_URL}/assets/avatars/${user.avatar}`
            : "assets/white.jpg";


            const violetDiv = document.querySelector(".violet");
            if (violetDiv) {
                if (user.cover) {
                    violetDiv.style.backgroundImage = `url('${API_URL}/assets/covers/${user.cover}')`;
                } else {
                    violetDiv.style.backgroundColor = "blueviolet";
                }
            }


        const editBtn = document.querySelector(".edit");
        if (!profileId || Number(profileId) === currentUserId) {
            if (editBtn) editBtn.style.display = "block"; // affiche le bouton d'édition si c'est notre propre profil
        } else {
            if (editBtn) editBtn.style.display = "none";  // cache le bouton d'édition si c'est le profil de quelqu'un d'autre
        }

        h2El.textContent = user.display_name;       // H2 in left block
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
        const response = await fetch(gamesUrl,
            { credentials: "include" }
        );

    if (!response.ok) throw new Error("Failed to load games");

    allGames = await response.json();
    filteredGames = [...allGames];      // ... pour faire une copie indépendante de allGames

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

    if (filteredGames.length <= initial) {
        button.style.display = "none";
    } else {
        button.style.display = "flex"; 
        button.textContent = "Show more";
    }

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

    // 1.   Essayer de prendre l'ID du propriétaire du profil à partir de la variable globale (qui devrait être définie si on a déjà chargé les infos du profil)
    // 2. Si la variable globale est vide (par exemple, si l'utilisateur a cliqué très rapidement avant que les infos du profil ne soient chargées), essayer de prendre l'ID à partir de l'URL (pour le cas où on arrive sur ce page en cliquant sur un profil d'utilisateur depuis une autre page)
    let targetId = profileId || currentUserId;

    // 3. Si ВСЁ ЕЩЕ пусто (exemple, cliqué trop vite), on fait une requête d'urgence
    if (!targetId) {
        console.log("Id n'est pas taked...");
        try {
            const res = await fetch(`${API_URL}/users/me`, { credentials: "include" });
            if (res.ok) {
                const user = await res.json();
                currentUserId = user.id; // sauvegarder pour éviter de refaire ce genre de requête à l'avenir
                targetId = user.id;
            }
        } catch (err) {
            console.error("Error during authorization check on click", err);
        }
    }

    // 4. Finally, if we have an ID, save it and redirect. If not, redirect to login as a fallback.
    if (targetId) {
        localStorage.setItem("selectedGameId", gameId);
        localStorage.setItem("selectedProfileOwnerId", targetId);
        
        console.log("Saved to Storage: Game:", gameId, "Owner:", targetId);
        window.location.href = "accountGuides.html";
    } else {
        // Meme si c'est une situation très improbable, on gère le cas où on n'arrive pas à déterminer l'ID de l'utilisateur
        console.error("Error: Could not determine profile owner ID. Redirecting to login.");
        window.location.href = "login.html";
    }
});


fetchUserGames();