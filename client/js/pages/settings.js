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




const svgs = document.querySelectorAll('.upload-icon');
const inputs = document.querySelectorAll('.images');
const passwordInput = document.getElementById('password');
if (passwordInput) {
    passwordInput.value = ""; // efface le champ de mot de passe pour éviter les problèmes d'autocomplétion
}
// Click sur l'icône pour ouvrir le sélecteur de fichiers
svgs.forEach(svg => {
    svg.addEventListener('click', () => {
        const target = svg.getAttribute('data-target');
        const input = document.querySelector(`.images[data-preview="${target}"]`);
        input.click();
    });
});

// En choisissant une image, afficher un aperçu
inputs.forEach(input => {
    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert("Veuillez choisir une image !");
            return;
        }

        const previewId = input.getAttribute('data-preview');
        const preview = document.getElementById(previewId);

        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    });
});


const container = document.querySelector('.form');

// accountUser.js
const avatarEl = document.querySelector(".left .avatar");
const usernameEl = document.querySelector(".left .username");
const h2El = document.querySelector(".left h2");
const descriptionEl = document.querySelector(".left .description p");
const followersEl = document.getElementById("followers");


// Info for current user
async function fetchUserInfo() {
    try {
        const res = await fetch(`${API_URL}/users/me`, {
            credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to fetch user info");

        const user = await res.json();



        document.querySelector('input[name="username"]').value = user.username || "";
        document.querySelector('input[name="display_name"]').value = user.display_name || "";
        document.querySelector('input[name="email"]').value = user.email || "";
        document.querySelector('textarea[name="bio"]').value = user.bio || "";

        // ajoute l'avatar de l'utilisateur ou une image par défaut
        avatarEl.src = user.avatar
            ? `${API_URL}/assets/avatars/${user.avatar}`
            : "assets/white.jpg";


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

            const violetDiv = document.querySelector(".violet");
            if (violetDiv) {
                if (user.cover) {
                    violetDiv.style.backgroundImage = `url('${API_URL}/assets/covers/${user.cover}')`;
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


const form = document.getElementById('settings-form');

form.addEventListener('submit', async(e) => {
    e.preventDefault();     // pour ne pas rafraichir le page

    const formData = new FormData(form);

    try {
        const response = await fetch(`${API_URL}/account/update`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        // response.headers.get("content-type") peut être null si le serveur ne renvoie pas d'en-tête Content-Type,
        //  donc on vérifie d'abord s'il existe avant de tenter de l'utiliser pour éviter une erreur côté client.
        const contentType = response.headers.get("content-type");
        let result;
        
        // On vérifie d'abord si le serveur a renvoyé du JSON (ce qui est attendu même en cas d'erreur grâce à la gestion d'erreur améliorée dans le backend),
        if (contentType && contentType.includes("application/json")) {
            result = await response.json();
        } else {
            // Si le serveur ne renvoie pas de JSON (comme dans le cas d'une erreur 500 sans gestion d'erreur appropriée),
            //  on lance une erreur pour que le catch puisse l'afficher
            throw new Error("Le serveur a renvoyé une réponse invalide (Erreur 500)");
        }


        if (response.ok) {
            alert('Les donneés est bien mis a jour!');


            // Update the donnes 
            if (result.user.avatar) {
                const avatarUrl = `${API_URL}/assets/avatars/${result.user.avatar}`;
                avatarEl.src = avatarUrl; // Avatar dans le bloc de gauche
                
                const rightAvatarImg = document.querySelector(".right-avatar");
                if (rightAvatarImg) rightAvatarImg.src = avatarUrl;     // Avatar dans le bloc de droite
            }

            // 2. Mise à jour de l'image de couverture si elle a été modifiée
            if (result.user.cover) {
                const coverUrl = `${API_URL}/assets/covers/${result.user.cover}`;
                const violetDiv = document.querySelector(".violet");
                if (violetDiv) {
                    violetDiv.style.backgroundImage = `url('${coverUrl}')`;
                    violetDiv.style.backgroundSize = "cover"; // Pour que l'image couvre tout le div
                    violetDiv.style.backgroundPosition = "center";
                }
            }
            
            // 3. Mise à jour du nom d'affichage, du nom d'utilisateur et de la bio
            h2El.textContent = result.user.display_name;
            usernameEl.textContent = `@${result.user.username}`;
            descriptionEl.textContent = result.user.bio || "Bonjour Lorem...";

        } else {
            alert('Erreur: ' + (result.message || "Erreur inconnue"));
        }
    } catch (error) {
        console.error("Erreur détaillée:", error);
        alert("Erreur: " + error.message);
    }
});



////////////// LOGOUT //////////////


const logoutBtn = document.querySelector('.logout');

logoutBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    try {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        if (response.ok) {
            
            window.location.replace("login.html");
        } else {
            console.error("Erreur en logout");
        }
        
    } catch (error) {
        console.error("Erreur", error);
    }
})





////////////// DELETE ACCOUNT ///////////////////

const deleteForm = document.getElementById('delete-account-form');

if (deleteForm) {
    deleteForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Arrêter le formulaire de se soumettre normalement

        // Confirmation avant de supprimer le compte
        const confirmed = confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
        
        if (confirmed) {
            try {
                const response = await fetch(`${API_URL}/account/delete`, {
                    method: "DELETE", // IMPORTANT: UTILISER DELETE pour correspondre à la route définie dans le backend
                    credentials: "include",
                });

                const result = await response.json();

                if (response.ok) {

                    alert("Votre compte a été supprimé avec succès.");

                    // Apres la suppression du compte, on redirige vers la page de login
                    window.location.replace("login.html");
                } else {
                    alert("Erreur lors de la suppression : " + result.message);
                }
            } catch (error) {
                console.error("Erreur réseau :", error);
                alert("Impossible de contacter le serveur.");
            }
        }
    });
}