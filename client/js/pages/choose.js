
async function fetchUserInfo() {
    try {
        const res = await fetch("http://localhost:5001/users/me", {
            credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to fetch user info");

        const user = await res.json();

            const rightAvatarImg = document.querySelector(".right-avatar");
            const rightNicknameAnchor = document.querySelector(".nickname a:first-child");

            if (rightAvatarImg) {
                rightAvatarImg.src = user.avatar 
                    ? `http://localhost:5001/assets/avatars/${user.avatar}` 
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



const container = document.querySelector(".swiper-wrapper");

const fetchData = async () => {

  try {
    const response = await fetch('http://localhost:5001/main/afficheJeux', {
      credentials:"include",
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const allGames = await response.json();
    console.log(allGames);

    renderGames(allGames);
  } catch (error) {
    console.error("Fetch failed:", err);
    container.innerHTML = `<p>Failed to load games.</p>`;
  }
};

const renderGames = (jeux) => {
  let jeuxHTML = '';

  jeux.forEach(jeu => {
    jeuxHTML += `
      <div class="swiper-slide" data-id="${jeu.id}">
        <img src="assets/gamePhoto/${jeu.cover}" alt="${jeu.title}" />
      </div>
    `;
  });

  container.innerHTML = jeuxHTML;
};

// executer fetch
fetchData();





const swiper = new Swiper(".swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      initialSlide: 3,
      speed: 600,
      preventClicks: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,        // angle de rotation des cartes
        stretch:30,       // distance entre eux
        depth: 250,       // Profondeur (effet d'éloignement)
        modifier: 1,      // force de l’effet
        slideShadows: true,  // ombres
      },
      on:{
        click(event) {
          swiper.slideTo(this.clickedIndex);
        },
      },
      pagination:{
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });


    // Bouton de validation pour aller à la page d'ajout de guide
const validerBtn = document.getElementById("validerBtn");
validerBtn.addEventListener("click", () => {
  const activeSlide = document.querySelector(".swiper-slide-active");
  if (!activeSlide) return;

  const gameId = activeSlide.dataset.id;      // prend id du jeu sélectionné
  window.location.href = `ajoutGuide.html?id=${gameId}`;  // redirige vers la page d'ajout de guide avec l'id du jeu dans l'URL
});






const buttons = document.querySelectorAll(".button");
buttons.forEach(touch => {
    touch.addEventListener("click",() =>{
        buttons.forEach(btn => btn.classList.remove("active")); 
            touch.classList.add("active");   
    });
});
