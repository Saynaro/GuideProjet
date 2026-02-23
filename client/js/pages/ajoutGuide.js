
// take id from URL
const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");

if (!gameId) {
    alert("ID du jeux n'est pas trouvé en URL");
}

// Afficher l'info du jeux (title + cover)
const displayGame = async () => {
    try {
        const res = await fetch("http://localhost:5001/main/afficheJeux", {
            credentials: "include",
        });
        if (!res.ok) throw new Error(`Erreur du serveur: ${res.status}`);

        const allGames = await res.json();
        const game = allGames.find(g => g.id == gameId);

        if (!game) throw new Error("Jeux n'as pas trouvé");

        document.querySelector(".game-title").textContent = game.title;
        const img = document.querySelector(".game-image");
        img.src = `assets/gamePhoto/${game.cover || "default-cover.jpg"}`;
        img.alt = game.title;

    } catch (err) {
        console.error(err);
        document.querySelector(".game-title").textContent = "Jeux n'as pas trouvé";
    }
};

displayGame();

// --- Form pour ajouter le guide ---
const form = document.getElementById("guideForm");
const previewContainer = document.querySelector(".guide-photo"); // container pour afficher les previews 

// afficher les previews des images choisies
document.getElementById("guideImage").addEventListener("change", (e) => {
    previewContainer.innerHTML = ""; // clear previous previews
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.createElement("img");
            img.src = event.target.result;
            img.style.maxWidth = "150px";
            img.style.marginRight = "10px";
            img.style.borderRadius = "5px";
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(files[i]);
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const content = document.getElementById("guideContent").value.trim();
    const title = document.getElementById("title").value.trim();
    const imageFiles = document.getElementById("guideImage").files;

    if (!content || !title) {
        alert("Veuillez remplir le titre et contenu du guide");
        return;
    }

    // Creer FormData pour envoie des files
    const formData = new FormData();
    formData.append("game_id", gameId);
    formData.append("content", content);
    formData.append("title", title);

    // Ajouter tous les images choisi
    for (let i = 0; i < imageFiles.length; i++) {
        formData.append("images", imageFiles[i]); // key "images" paraille pour tous
    }

    try {
        const response = await fetch("http://localhost:5001/guides/", {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        if (!response.ok) throw new Error(`Erreur du serveur: ${response.status}`);

        const data = await response.json();
        console.log(data);
        alert("Guide est creé avec success!");

        form.reset();
        previewContainer.innerHTML = ""; // clear preview
    } catch (err) {
        console.error("Error detaillé:", err);
    

    console.log(`Erreur de creation du guide: ${err.message}`);
    }
});