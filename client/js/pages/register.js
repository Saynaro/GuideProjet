
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

    const data = await response.json();

    if (!response.ok) {
        // data.error contien le message du server
        showError(data.error || "Something is wrong");
        return;
    }



    errorMessage.style.display = "none";
    console.log("User registered:", data);

    // vider le forme
    form.reset();

    }catch (err){
        console.error("Fetch failed:", err);
        showError(err.message || "Network error");
    }
};

form.addEventListener('submit', async (event) => {
    event.preventDefault();         // pour ne pas rafraichir le page

    await fetchData();
});