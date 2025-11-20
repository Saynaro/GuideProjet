const swiper = new Swiper(".swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      initialSlide: 2,
      speed: 600,
      preventClicks: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,        // angle de rotation des cartes
        stretch:30,       // distance entre eux
        depth: 250,       // Profondeur (effet d'éloignement)
        modifier: 1,      // force de l’effet
        slideShadows: true,
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