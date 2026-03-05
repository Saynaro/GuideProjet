
const errorMessage = document.getElementById('error-message');

const form = document.getElementById('register_form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const displayName = document.getElementById('display_name');



// PASSWORD 
const isValidPassword = (password) => {
    // 8 symbols, 1 maj, 1 min, 1 chifre
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,}$/;
    return regex.test(password);
};

const togglePassword = document.getElementById('togglePassword');
const eyeOpen = document.getElementById('eyeOpen');
const eyeClosed = document.getElementById('eyeClosed');

togglePassword.addEventListener('click', () => {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";

    eyeOpen.style.display = isHidden ? "none" : "block";
    eyeClosed.style.display = isHidden ? "block" : "none";
});



const showError = (message) => {
    errorMessage.innerHTML = `
        ${message}
        <span class="close-btn" onclick="this.parentElement.style.display='none'">&times;</span>
    `;
    errorMessage.style.display = "block";
};


const fetchData = async () => {
    try{

        // on definit l'url de l'api en fonction de l'environnement (dev ou prod) pour éviter les problèmes de CORS et de chemins relatifs
        // 1. On tente de faire la requete, en supposant que le serveur répond avec du JSON (succès ou erreur métier)
        const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:5001'
            : '';

    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // OBLIGATOIRE pour les cookies et JWT
        body: JSON.stringify({
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            display_name: displayName.value
        })
    });

    const contentType = response.headers.get("content-type");
        
        if (contentType && contentType.includes("application/json")) {
            // Si le serveur a répondu avec du JSON (succès ou erreur métier)
            const data = await response.json();

            if (!response.ok) {
                // Console log l'erreur 
                showError(data.error || "Registration failed");
                return;
            }

            // Si tout s'est bien passé, on peut rediriger ou afficher un message de succès
            console.log("User registered:", data);
            form.reset();
            window.location.href = "main.html"; 
            
        } else {
            // 2. Si le serveur a répondu avec du texte brut (erreur serveur), on affiche un message générique
            const rawError = await response.text(); 
            console.error("Server error raw text:", rawError);
            showError("This username is already taken. Please choose another one."); // Message générique pour les erreurs serveur, car on ne peut pas faire confiance au contenu exact du message d'erreur
        }
    }catch (err){
        console.error("Fetch failed:", err);
        showError(err.message || "Network error");
    }
};

form.addEventListener('submit', async (event) => {
    event.preventDefault();         // pour ne pas rafraichir le page

        if (!isValidPassword(passwordInput.value)) {
            showError("Le mot de passe doit etre au moins 8 symbols et contenir 1 majuscule, 1 miniscule, et 1 chiffre ou symbole");
            return;
        }
    
    await fetchData();
});