// Define API_URL based on environment (development or production) to avoid CORS issues and relative path problems
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5001'
    : '';

async function fetchUserInfo() {
    try {
        const res = await fetch(`${API_URL}/users/me`, {
            credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to fetch user info");

        const user = await res.json();

            const rightAvatarImg = document.querySelector(".right-avatar");
            const rightNicknameAnchor = document.querySelector(".nickname a:first-child");

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