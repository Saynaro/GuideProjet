const container = document.querySelector(".games_block");
const counter = document.getElementById("search_results");
const button = document.getElementById("view_more");



async function fetchUserInfo() {
    try {
        const res = await fetch("http://localhost:5001/users/me", {
            credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to fetch user info");

        const user = await res.json();

            const rightAvatarImg = document.querySelector(".right-avatar");
            const rightNicknameAnchor = document.querySelector(".nick a:first-child");

            if (rightAvatarImg) {
                rightAvatarImg.src = user.avatar 
                    ? `http://localhost:5001/assets/avatars/${user.avatar}` 
                    : "assets/white.jpg";
            }

            if (rightNicknameAnchor) {
                rightNicknameAnchor.textContent = user.username;
            }

    } catch (err) {
        console.error(err);
    }
}

fetchUserInfo();




let allGuides = [];
const initial = 9;
const step = 6;
let currentIndex = 0;
let isExpanded = false;

// take the choosed game
const gameId = localStorage.getItem("selectedGameId");

async function fetchGuides() {
    try {
        const response = await fetch(`http://localhost:5001/guides/${gameId}`, {
            credentials: "include"
        });
        if (!response.ok) throw new Error("Failed to fetch guides");

        allGuides = await response.json();
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
                return `http://localhost:5001/assets/guides/${fileName}`;
            }
        } catch (err) {
            // 2. si en base de données le champ image n'est pas un JSON valide (peut-être une string simple), on essaie de l'utiliser directement
            console.warn("Les données ne sont pas au format JSON:", guide.image);
            const fileName = guide.image;
            return `http://localhost:5001/assets/guides/${fileName}`;
        }
    }
    
    // 3. si aucune image n'est disponible, retourner une image par défaut
    return `assets/gamePhoto/${guide.games.cover || "default-cover.jpg"}`;
}



async function renderCard(guide) {
    const avatar = guide.users.avatar || "default-avatar.jpg";
    const title = guide.title;
    const username = guide.users.username;
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
                    <a href="#">${title}</a>
                </div>
                <a href="#"><img src="${coverUrl}" alt="${title}"></a>
                <div class="sousimg">
                    <div class="avatar">
                        <img src="assets/avatars/${avatar}" class = "sousimg-avatar"  alt="${username}">
                        <a href="account.html" class="name">${username}</a>
                    </div>
                    <p class="time">${time}</p>
                </div>
            </div>
        </div>`
    );
}

async function renderInitial() {
    container.innerHTML = "";
    const slice = allGuides.slice(0, initial);
    
    for (const guide of slice) {
        await renderCard(guide);
    }

    currentIndex = slice.length;
    isExpanded = false;
    button.textContent = "Show more";
}

async function addNext() {
    const slice = allGuides.slice(currentIndex, currentIndex + step);
    for (const guide of slice) {
        await renderCard(guide);
    }
    currentIndex += slice.length;

    if (currentIndex >= allGuides.length) {
        button.textContent = "Hide";
        isExpanded = true;
    }

    updateCounter();
}

function updateCounter() {
    counter.textContent = `Showing ${currentIndex} of ${allGuides.length} results`;
}

button.addEventListener("click", async () => {
    if (!isExpanded) {
        await addNext();
    } else {
        await renderInitial();
    }
});

fetchGuides();
