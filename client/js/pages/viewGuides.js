const params = new URLSearchParams(window.location.search);
const guideId = params.get("id");

async function fetchFullGuide() {
    try {
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