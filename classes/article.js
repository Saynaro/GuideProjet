export default class Guide {
    #codeGuide;
    #tags;
    #nom;
    #dateCreation;
    #dateModification;
    #nombreDeVues;
    #nombreDeLikes;
    #nombreDeFavoris;

    //#data;

    /*Constructeur de la classe Guide
    
    constructor(codeGuide, tags, nom, dateCreation, dateModification, nombreDeVues, nombreDeLikes, nombreDeFavoris)
    {
        this.#data = {codeGuide, tags, nom, dateCreation, dateModification, nombreDeVues, nombreDeLikes, nombreDeFavoris};
    };

    get(prop){
        return this.#data[prop];
    };

    set(prop, value){
        this.#data[prop] = value;
    };
    
    */

    constructor(codeGuide, tags, nom, dateCreation, dateModification, nombreDeVues, nombreDeLikes, nombreDeFavoris) {
        this.#codeGuide = codeGuide;
        this.#tags = tags;
        this.#nom = nom;
        this.#dateCreation = dateCreation;
        this.#dateModification = dateModification;
        this.#nombreDeVues = nombreDeVues;
        this.#nombreDeLikes = nombreDeLikes;
        this.#nombreDeFavoris = nombreDeFavoris;
    };

    

    
    



}