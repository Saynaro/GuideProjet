import jwt from "jsonwebtoken";


// this variable will contain our users id
export const generateToken = (userId, res) => {
    const payload = { id: userId };

    // GENERER JWT_SECRET IN .env file
    // use "process.env" pour acceder a ".env" file, 
    // on met "expiresIn" en "{}"  parce que c'est un objet
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });


    // res.cookie() first param is what we want n'importe quoi "jwt" ou "test";
    // and we put "token" - second param in our first param "jwt" 
    // second param is "token";  third param - is info what we want to send to frontend IN OBJECT
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // "lax" permet de protéger contre les attaques CSRF tout en permettant une certaine flexibilité pour les requêtes inter-domaines. permet de envoyer le cookie dans differentes portes
        // "strict" bloque toutes les requêtes inter-domaines, même celles initiées par des liens ou des formulaires, offrant une protection maximale contre les attacks CSRF, mais peut causer des problèmes de compatibilité avec certains sites ou fonctionnalités.
        // "strict" est plus sécurisé mais peut causer des problèmes de compatibilité, tandis que "lax" offre un bon équilibre entre sécurité et compatibilité pour la plupart des applications web.

        sameSite: "lax",                                     // pour securiser de CSR attacks
        maxAge: (1000 * 60 * 60 * 24) * 7,                      // in milliseconds (1000ms = 1s)
    });

    return token;
};