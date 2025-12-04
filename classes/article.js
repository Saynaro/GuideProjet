export default class Article {
    #codeArticle;
    #tags;
    #nom;
    #dateCreation;
    #dateModification;
    #nombreDeVues;
    #nombreDeLikes;
    #nombreDeFavoris;

    //#data;

    /*Constructeur de la classe Article
    
    constructor(codeArticle, tags, nom, dateCreation, dateModification, nombreDeVues, nombreDeLikes, nombreDeFavoris)
    {
        this.#data = {codeArticle, tags, nom, dateCreation, dateModification, nombreDeVues, nombreDeLikes, nombreDeFavoris};
    };

    get(prop){
        return this.#data[prop];
    };

    set(prop, value){
        this.#data[prop] = value;
    };
    
    */

    constructor(codeArticle, tags, nom, dateCreation, dateModification, nombreDeVues, nombreDeLikes, nombreDeFavoris) {
        this.#codeArticle = codeArticle;
        this.#tags = tags;
        this.#nom = nom;
        this.#dateCreation = dateCreation;
        this.#dateModification = dateModification;
        this.#nombreDeVues = nombreDeVues;
        this.#nombreDeLikes = nombreDeLikes;
        this.#nombreDeFavoris = nombreDeFavoris;
    };

    

    
    



}