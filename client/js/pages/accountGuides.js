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

// ID of the owner of the profile we're viewing (could be ourselves or another user)
let ownerId = localStorage.getItem("selectedProfileOwnerId");

if (!ownerId || ownerId === "undefined") {
    const params = new URLSearchParams(window.location.search);
    ownerId = params.get("id") || "me"; 
}

// Array to store all guides and filtered guides for search and pagination
let allGuides = [];
let filteredGuides = [];

// Pagination variables
const initial = 12;
const step = 6;
let currentIndex = 0;
let isExpanded = false;
let currentUserId = null;
// =====================
// Function: user info call and render in left block
// =====================
async function fetchUserInfo() {

    try {

        // 1. First, we fetch the current user's info to get their ID, which is necessary for correctly rendering the guide cards (especially for showing/hiding delete button)
        const authRes = await fetch(`${API_URL}/users/me`, { credentials: "include" });
        if (!authRes.ok) throw new Error("Not authenticated");
        const me = await authRes.json();
        currentUserId = me.id;  // id of authenticated user, which we will use to determine if the profile we're viewing is our own or someone else's, and also for rendering guide cards correctly (show/hide delete button)

        
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

        // 2. Now we have the current user's ID, we can safely fetch the profile info of the page we're viewing (which could be our own profile or another user's profile, depending on the URL and localStorage)
        const userUrl = (ownerId && ownerId !== "me") 
            ? `${API_URL}/users/${ownerId}` 
            : `${API_URL}/users/me`;

        const res = await fetch(userUrl, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch profile info");
        const user = await res.json();




        const editBtn = document.querySelector(".edit"); 

        if (editBtn) {
            // If we're viewing someone else's profile, hide the edit button. If it's our own profile, show it.
            if (ownerId && ownerId !== "me" && parseInt(ownerId) !== currentUserId) {
                editBtn.style.display = "none"; // hide for other users
            } else {
                editBtn.style.display = "block"; // show for ourselves
            }
        }
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

        h2El.textContent = user.display_name || user.username;
        usernameEl.textContent = `@${user.username}`;
        descriptionEl.textContent = user.bio || "Bonjour ...";
        followersEl.textContent = `${user.followersCount || 0} Followers`;

        // 3. Execute guide fetching only after we have the currentUserId, which is necessary for correctly rendering the guide cards (especially for showing/hiding delete button)
        // use fetchGuides() here to ensure that we have the currentUserId before we try to render any guides, because the rendering logic for each guide card may depend on whether the guide belongs to the current user or not (for example, to show or hide the delete button).
        
        fetchGuides();
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
        const res = await fetch(`${API_URL}/users/${ownerId}/games/${gameId}/guides`, {
            credentials: "include"
        });
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

    if (filteredGuides.length <= initial) {
        button.style.display = "none";
    } else {
        button.style.display = "flex"; 
        button.textContent = "Show more";
    }

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
                    <a href="viewGuides.html?id=${guide.id}&fromAccount=true">${guide.title}</a>
                </div>
                <a href="viewGuides.html?id=${guide.id}&fromAccount=true">
                    <img src="${API_URL}/assets/guides/${guideImage}" alt="${guide.title}">
                </a>
                <div class="sousimg">
                    <div class="avatar-sousimg">
                        <img src="${API_URL}/assets/avatars/${avatar}" alt="${username}">
                        <a href="account.html?id=${guide.user_id || ownerId}" class="name">${username}</a>
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