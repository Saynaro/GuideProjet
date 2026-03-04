
const errorMessage = document.getElementById('error-message');

const form = document.getElementById('register_form');
// const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');


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
    const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // OBLIGATOIRE pour les cookies et JWT
        body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value,
        })
    });

    const data = await response.json();

    if (!response.ok) {
        // data.error contien le message du server
        showError(data.error || "Something is wrong");
        return;
    }



    errorMessage.style.display = "none";

    // vider le forme
    form.reset();

    window.location.replace('main.html');

    // window.location.href = 'main.html';
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