export default class Jeux {
    #idJeu;
    #tags;
    #nom;
    #image;
    #nombreDeGuides;

    constructor(idJeu, tags, nom, image, nombreDeGuides) {
        this.#idJeu = idJeu;
        this.#tags = tags;
        this.#nom = nom;
        this.#image = image;
        this.#nombreDeGuides = nombreDeGuides;
    }

    
    /*

    get idJeu() {
        return this.#idJeu;
    }
    get tags() {
        return this.#tags;
    }
    get nom() {
        return this.#nom;
    }   
    get image() {
        return this.#image;
    }   
    get nombreDeGuides() {
        return this.#nombreDeGuides;
    }   


    set idJeu(value) {
        this.#idJeu = value;
    }
    set tags(value) {
        this.#tags = value;
    }   
    set nom(value) {
        this.#nom = value;
    }   
    set image(value) {
        this.#image = value;
    }   
    set nombreDeGuides(value) {
        this.#nombreDeGuides = value;
    }   

    */


    afficher() {
        return ` ID: ${this.#idJeu}, Jeu: ${this.#nom}, Tags: ${this.#tags}, Nombre de guides: ${this.#nombreDeGuides}`;
    }
}
const Jeux1 = new Jeux(1, 'Action',  'The Legend of Zelda', 'zelda.jpg', 5);

console.log(Jeux1.afficher());