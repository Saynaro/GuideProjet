const swiper = new Swiper(".swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      initialSlide:2,
      speed: 600,
      preventClicks: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,        // угол поворота карточек
        stretch: 80,       // расстояние между ними
        depth: 350,       // ГЛУБИНА (эффект отдаления)
        modifier: 1,      // сила эффекта
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