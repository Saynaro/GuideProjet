


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













// let cartHTML ='';

// cart.forEach(cartItem => {
//     const productId = cartItem.productId;

//     let matchingProduct;

//     products.forEach(product => {
//         if (product.id  === productId) {
//             matchingProduct = product;
            
//         }
        
//     });
    
    


//     cartHTML += // below i created a special class for each container with their current id
//     //that's useful when i want to delete a product from my cart.
//     //  For choose in DOM exact a container which i need to delete.
//     // and delete it from my cart page
//     `           
//         <div class="item item-container-${matchingProduct.id}">
//             <div class="image-column">
//                 <input type="checkbox" class="item-checkbox">
//                 <img src="${matchingProduct.image}">
//             </div>
//             <div class="item-title-column">
//                 <p class="title">${matchingProduct.name}</p>
//                 <div class="item-title-column-icons">
//                     <button class="icon-button delete-item-button" data-product-id="${matchingProduct.id}">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
//                     </button>
//                     <button class="icon-button">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
//                     </button>
//                 </div>
//             </div>

//             <div class="price-column">
//                 <p class="prix product-prix">${(matchingProduct.priceCents / 100).toFixed(2)} €</p>
//             </div>
//             <div class="input-column">
//                 <button class="quantity-button" >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
//                 </button>
//                 <span class="quantityItem">${cartItem.quantity}</span>
//                 <button class="quantity-button" >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14"/></svg>
//                 </button>
//             </div>
//         </div>
//     `
// });