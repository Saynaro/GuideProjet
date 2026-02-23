// document.getElementById('username').addEventListener('input', function() {
//     const username = this.value;
//     const errorElement = document.getElementById('username-error');
//     if (username.length < 3) {
//         errorElement.textContent = 'Username must be at least 3 characters long.';
//         errorElement.style.display = 'block';
//     } else {
//         errorElement.style.display = 'none';
//     }
// });


const errorMessage = document.getElementById('error-message');

const form = document.getElementById('register_form');
// const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');


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

    await fetchData();
});