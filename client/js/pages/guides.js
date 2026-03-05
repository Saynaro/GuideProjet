// Define API_URL based on environment (development or production) to avoid CORS issues and relative path problems
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5001'
    : '';

const container = document.querySelector(".games_block");
const counter = document.getElementById("search_results");
const searchInput = document.getElementById("searchInput");
const button = document.getElementById("view_more");



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




let allGuides = [];
let filteredGuides = [];
const initial = 9;
const step = 6;
let currentIndex = 0;
let isExpanded = false;

// take the choosed game
const gameId = localStorage.getItem("selectedGameId");

async function fetchGuides() {
    try {
        const response = await fetch(`${API_URL}/guides/${gameId}`, {
            credentials: "include"
        });
        if (!response.ok) throw new Error("Failed to fetch guides");

        allGuides = await response.json();
        filteredGuides = [...allGuides];      // ... pour faire une copie indépendante de allGuides

        await renderInitial();
        updateCounter();
    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Failed to load guides.</p>";
    }
}


async function getCover(guide) {
    if (guide.image) {
        try {
            // 1. Essai de parser le champ image comme JSON (car on stocke un array d'images en JSON dans la base de données)
            const images = JSON.parse(guide.image);

            if (Array.isArray(images) && images.length > 0) {
                // ON ECRIT LE CHEMIN COMPLET POUR AFFICHER L'IMAGE: http://localhost:5001/assets/guides/nom_du_fichier.jpg
                const fileName = images[0]; 
                return `${API_URL}/assets/guides/${fileName}`;
            }
        } catch (err) {
            // 2. si en base de données le champ image n'est pas un JSON valide (peut-être une string simple), on essaie de l'utiliser directement
            console.warn("Les données ne sont pas au format JSON:", guide.image);
            const fileName = guide.image;
            return `${API_URL}/assets/guides/${fileName}`;
        }
    }
    
    // 3. si aucune image n'est disponible, retourner une image par défaut
    return `assets/gamePhoto/${guide.games.cover || "default-cover.jpg"}`;
}



async function renderCard(guide) {
    const avatar = guide.users.avatar || "default-avatar.jpg";
    const title = guide.title;
    const username = guide.users.display_name || guide.users.username;
    const rawDate = guide.created_at;  // c'est la date brute telle qu'elle est stockée en base de données 2026-01-15T14:30:00Z
    const time = new Date(rawDate).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const coverUrl = await getCover(guide); 

    container.insertAdjacentHTML(
        "beforeend",
        `<div class="game">
            <div class="game-inner">
                <div class="text">
                    <a href="viewGuides.html?id=${guide.id}">${title}</a>
                </div>
                <a href="viewGuides.html?id=${guide.id}"><img src="${coverUrl}" alt="${title}"></a>
                <div class="sousimg">
                    <div class="avatar">
                        <img src="../server/client/assets/avatars/${avatar}" class = "sousimg-avatar"  alt="${username}">
                        <a href="account.html?id=${guide.users.id}" class="name">${username}</a>
                    </div>
                    <p class="time">${time}</p>
                </div>
            </div>
        </div>`
    );
}

async function renderInitial() {
    container.innerHTML = "";
    const slice = filteredGuides.slice(0, initial);
    
    for (const guide of slice) {
        await renderCard(guide);
    }

    currentIndex = slice.length;
    isExpanded = false;


    if (filteredGuides.length <= initial) {
        button.style.display = "none";
    } else {
        button.style.display = "flex"; 
        button.textContent = "Show more";
    }
}

async function addNext() {
    const slice = filteredGuides.slice(currentIndex, currentIndex + step);
    for (const guide of slice) {
        await renderCard(guide);
    }
    currentIndex += slice.length;

    if (currentIndex >= filteredGuides.length) {
        button.textContent = "Hide";
        isExpanded = true;
    }

    updateCounter();
}

function updateCounter() {
    counter.textContent = `Showing ${currentIndex} of ${filteredGuides.length} results`;
}


searchInput.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase().trim();

    filteredGuides = allGuides.filter(game =>
        game.title.toLowerCase().includes(value)
    );

    renderInitial();
});


button.addEventListener("click", async () => {
    if (!isExpanded) {
        await addNext();
    } else {
        await renderInitial();
    }
});

fetchGuides();
