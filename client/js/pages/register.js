
const errorMessage = document.getElementById('error-message');

const form = document.getElementById('register_form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const displayName = document.getElementById('display_name');


const showError = (message) => {
    errorMessage.innerHTML = `
        ${message}
        <span class="close-btn" onclick="this.parentElement.style.display='none'">&times;</span>
    `;
    errorMessage.style.display = "block";
};


const fetchData = async () => {
    try{
    const response = await fetch('http://localhost:5001/auth/register', {
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

    
    await fetchData();
});