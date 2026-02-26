const params = new URLSearchParams(window.location.search);
const showDelete = params.get('fromAccount');
const guideId = params.get("id");


// verifie si on est venu via accountGuide
if (showDelete === 'true' && guideId) {
    const parentContainer = document.querySelector('.second');

    if (parentContainer) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Supprimer le guide";
        deleteBtn.className = "delete-button"; 
        
        deleteBtn.addEventListener('click', async () => {
            if (confirm("Vous etes sure?")) {
                try {
                    const response = await fetch(`http://localhost:5001/guides/${guideId}`, {
                        method: 'DELETE',
                        credentials: "include"
                    });

                    if (response.ok) {
                        alert("Guide bien supprimé");
                        window.location.href = "account.html"; 
                    } else {
                        const errorData = await response.json().catch(() => ({}));
                        alert(`Erreur lors de supprime: ${errorData.message || "Pas d'acces"}`);
                    }
                } catch (err) {
                    console.error("Erreur du serveur:", err);
                    alert("Erreur de connection à serveur");
                }
            }
        });

        parentContainer.appendChild(deleteBtn);
    } else {
        console.warn("Element .second n'as pas été trouvé.");
    }
}


        const deleteBtn = document.querySelector(".delete-button");


async function fetchFullGuide() {
    try {
        const authRes = await fetch("http://localhost:5001/users/me", { credentials: "include" });
        const currentUser = await authRes.json();


        // 2. Получаем сам гайд
        const response = await fetch(`http://localhost:5001/guides/single/${guideId}`, {
            credentials: "include"
        });

        if (!response.ok) throw new Error("Guide not found");

        const guide = await response.json();

        // Remplir les éléments de la page avec les données du guide
        document.getElementById("guide-title").textContent = guide.title;
        document.getElementById("guide-author").textContent = `By ${guide.users.display_name || guide.users.username}`;
        document.getElementById("guide-text").textContent = guide.content;

        const imagesContainer = document.getElementById("guide-images");
        imagesContainer.innerHTML = ""; // Clear any existing images

        let hasImages = false;

        // Verify if the guide has an image field and try to parse it as JSON
        if (guide.image) {
            try {
                const images = JSON.parse(guide.image);
                if (Array.isArray(images) && images.length > 0) {
                    images.forEach(img => {
                        const imgTag = document.createElement("img");
                        imgTag.src = `http://localhost:5001/assets/guides/${img}`;
                        imagesContainer.appendChild(imgTag);
                    });
                    hasImages = true;
                }

                if (guide.user_id !== currentUser.id) {
                    if (deleteBtn) deleteBtn.style.display = "none";
                } else {
                    
                    if (deleteBtn) deleteBtn.style.display = "block";
                }
            } catch (err) {
                // If parsing fails, try to use the single image as a fallback
                if (guide.image.trim() !== "") {
                    const imgTag = document.createElement("img");
                    imgTag.src = `http://localhost:5001/assets/guides/${guide.image}`;
                    imagesContainer.appendChild(imgTag);
                    hasImages = true;
                }
            }
        }

        // if there are no images, try to use the game's cover as a fallback
        if (!hasImages) {
            const imgTag = document.createElement("img");
            // Take the game's cover if it exists, otherwise use a default image
            const gameCover = guide.games && guide.games.cover ? guide.games.cover : "default-cover.jpg";
            imgTag.src = `assets/gamePhoto/${gameCover}`;  // Use relative path for fallback image
                                                            // Not localhost:5001, but
            imagesContainer.appendChild(imgTag);
        } 

    } catch (err) {
        console.error(err);
        document.getElementById("guide-title").textContent = "Error loading guide";
    }
}

if (guideId) {
    fetchFullGuide();
} else {
    window.location.href = "main.html";
}