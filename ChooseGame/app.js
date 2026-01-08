// import { jeux } from "../Arrays/gamesArray.js";



// const jeuxHTML = '';

// jeux.forEach(jeu => {
//     jeuxHTML += `
//       <div class="swiper-slide">

//         <img src="../GamePhoto/${jeu.image}" alt="${jeu.titre}" />

//       </div>
//     `;

//     document.querySelector('.swiper-wrapper').innerHTML = jeuxHTML;

// });









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




const buttons = document.querySelectorAll(".button");
buttons.forEach(touch => {
    touch.addEventListener("click",() =>{
        buttons.forEach(btn => btn.classList.remove("active")); 
            touch.classList.add("active");   
    });
});

