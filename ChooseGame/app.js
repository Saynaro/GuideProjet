const swiper = new Swiper(".swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      coverflowEffect: {
        rotate: 0,        // угол поворота карточек
        stretch: 0,       // расстояние между ними
        depth: 200,       // ГЛУБИНА (эффект отдаления)
        modifier: 2,      // сила эффекта
        slideShadows: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });