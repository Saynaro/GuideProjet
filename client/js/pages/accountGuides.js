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

// === DOM elements ===
const container = document.querySelector(".games_block");
const counter = document.getElementById("search_results");
const button = document.getElementById("view_more");
const searchInput = document.getElementById("searchInput");

// left block elements (user info)
const avatarEl = document.querySelector(".left .avatar");
const usernameEl = document.querySelector(".left .username");
const h2El = document.querySelector(".left h2");
const descriptionEl = document.querySelector(".left .description p");
const followersEl = document.getElementById("followers");

// ID choosed game
const gameId = localStorage.getItem("selectedGameId");

// Array to store all guides and filtered guides for search and pagination
let allGuides = [];
let filteredGuides = [];

// Pagination variables
const initial = 12;
const step = 6;
let currentIndex = 0;
let isExpanded = false;

// =====================
// Function: user info call and render in left block
// =====================
async function fetchUserInfo() {
    try {
        const res = await fetch("http://localhost:5001/users/me", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch user info");

        const user = await res.json();

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

        h2El.textContent = user.display_name || user.username;
        usernameEl.textContent = `@${user.username}`;
        descriptionEl.textContent = user.bio || "Bonjour ...";
        followersEl.textContent = `${user.followersCount || 0} Followers`;

    } catch (err) {
        console.error(err);
    }
}

fetchUserInfo();

// =====================
// Function: fetch guides for selected game and render
// =====================
async function fetchGuides() {
    if (!gameId) {
        container.innerHTML = "<p>No game selected</p>";
        return;
    }

    try {
        const res = await fetch(`http://localhost:5001/users/me/games/${gameId}/guides`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch guides");

        const guides = await res.json();

        // Save guides to global arrays for pagination and search
        allGuides = [...guides];    // all guides from server; ...guides - spread operator to create a new array
        filteredGuides = [...allGuides]; // initially, filtered guides are the same as all guides
                                        // on ecrit ... pour eviter de faire filteredGuides = allGuides, car cela ferait que les deux variables pointent vers le même tableau en mémoire.
                                        //  En utilisant le spread operator, on crée une nouvelle copie du tableau, ce qui permet de modifier filteredGuides sans affecter allGuides.

        renderInitial();

    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Failed to load guides.</p>";
    }
}

// =====================
// Function for pagination: render initial guides, add next guides, update counter
// =====================
function renderInitial() {
    container.innerHTML = "";
    const slice = filteredGuides.slice(0, initial);
    slice.forEach(renderCard);
    currentIndex = slice.length;
    isExpanded = false;
    button.textContent = "Show more";
    updateCounter();
}

function addNext() {
    const slice = filteredGuides.slice(currentIndex, currentIndex + step);
    slice.forEach(renderCard);
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

// =====================
// Function to render a single guide card, including image, title, author info, and date
// =====================
function renderCard(guide) {
    // Guides image
    let guideImage = "default-cover.jpg";
    if (guide.image) {
        try {
            const images = JSON.parse(guide.image);
            if (Array.isArray(images) && images.length > 0) {
                guideImage = images[0];
            }
        } catch {
            guideImage = guide.image;
        }
    }

    // Users avatar and username
    const avatar = guide.users.avatar || "default-avatar.jpg";
    const username = guide.users.display_name || guide.users.username || "Unknown";

    // Date formatting
    const time = new Date(guide.created_at).toLocaleDateString();

    container.insertAdjacentHTML("beforeend", `
        <div class="game">
            <div class="game-inner">
                <div class="text">
                    <a href="#">${guide.title}</a>
                </div>
                <a href="#">
                    <img src="http://localhost:5001/assets/guides/${guideImage}" alt="${guide.title}">
                </a>
                <div class="sousimg">
                    <div class="avatar-sousimg">
                        <img src="http://localhost:5001/assets/avatars/${avatar}" alt="${username}">
                        <a href="account.html" class="name">${username}</a>
                    </div>
                    <p class="time">${time}</p>
                </div>
            </div>
        </div>
    `);
}

// =====================
// EVENTS
// =====================
button.addEventListener("click", () => {
    if (!isExpanded) {
        addNext();
    } else {
        renderInitial();
    }
});

searchInput.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase().trim();
    filteredGuides = allGuides.filter(guide =>
        guide.title.toLowerCase().includes(value)
    );
    renderInitial();
});

// =====================
// Initial render
// =====================
fetchGuides();