export default class Compte {
    #idCompte;
    #nom;
    #identifiant;
    #motDePasse;
    #numeroTelephone;
    #role;
    #biographie;

    constructor(idCompte, nom, identifiant, motDePasse, numeroTelephone, role, biographie) {
        this.#idCompte = idCompte;
        this.#nom = nom;
        this.#identifiant = identifiant;
        this.#motDePasse = motDePasse;
        this.#numeroTelephone = numeroTelephone;
        this.#role = role;
        this.#biographie = biographie;
    };


    


}
