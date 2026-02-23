// AFFICHER LES JEUX
//pour afficher les jeux

export function renderCard(jeu) {
    container.insertAdjacentHTML(        // pour ajouter des jeux a la fin d'array
      "beforeend",                        //
      `<div class="game ">
        <div class="game-inner">
                <a href="${jeu.lien}"><img src="assets/gamePhoto/${jeu.image}" alt="${jeu.titre}"></a>
        </div>
      </div>`
    );
}