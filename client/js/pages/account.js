// verify if user is authenticated, if not redirect to login page

async function checkAuth() {
    try {
        const res = await fetch("http://localhost:5001/users/me", {
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
                rightNicknameAnchor.textContent = user.display_name || user.username;
            }

            const violetDiv = document.querySelector(".violet");
            if (violetDiv) {
                if (user.cover) {
                    violetDiv.style.backgroundImage = `url('http://localhost:5001/assets/covers/${user.cover}')`;
                } else {
                    violetDiv.style.backgroundColor = "blueviolet";
                }
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
        const response = await fetch(
        "http://localhost:5001/users/me/games-with-guides",
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