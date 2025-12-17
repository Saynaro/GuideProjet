const button = document.getElementById('view_more');
const extraItems = document.querySelectorAll('.extra');
const showedGames = document.querySelectorAll('.game.extra');
const allGames = document.querySelectorAll('.game');
const searchResults = document.getElementById('search_results');


// Met à jour le texte des résultats de recherche
const showedGameFunction = () =>{
  if (button.innerText === "View More") {
      searchResults.textContent = `Showing ${allGames.length} out of ${allGames.length} results by last updated date in descending order`;
  } else {
    searchResults.textContent = `Showing ${showedGames.length} out of ${allGames.length} results by last updated date in descending order`;
  } 
}
searchResults.textContent = `Showing ${showedGames.length} out of ${allGames.length} results by last updated date in descending order`;





// Gérer l'affichage des éléments supplémentaires
let shown = false;

button.addEventListener('click', () => {
  extraItems.forEach(item => {
    item.classList.toggle('show'); // ajouter suprimer class "show"
  });

  button.textContent = shown ? 'View More' : 'Hide';
  shown = !shown;
});






//buttons allguides, favorites onclick active background color change

const buttons = document.querySelectorAll(".button");


buttons.forEach(button => {
    button.addEventListener("click",() =>{
        buttons.forEach(btn => btn.classList.remove("active")); 
            button.classList.add("active");   
    });
});