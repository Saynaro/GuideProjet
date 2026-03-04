import { prisma } from "../config/db.js";
import  bcrypt  from "bcryptjs";   // bcrypt is a library used to hash passwords before storing them in the database, enhancing security by making it difficult for attackers to retrieve original passwords even if they gain access to the database.
import { generateToken } from "../utils/generateToken.js";
import { Prisma } from "@prisma/client"; // utilise ici pour verifier si le user email ou username est unique


const register = async(req, res) => {
    try{
    const { username, email, password, display_name } = req.body;     // Extracting the name, email, and password from the request body sent by the client during registration.


    // Check if user with that email exists
    const userExists = await prisma.users.findUnique({          // This line checks if a user with the provided email already exists in the database. It uses Prisma's findUnique method to search for a user where the email matches the one provided in the request body.
            where: {email: email},
    });

    if (userExists) {
        return res                  // faire return pour ne pas continuer la fonction
        .status(400)
        .json({error: "User already exists with this email!"}) 
    }


    // hash password
    const salt = await bcrypt.genSalt(10);   // This line generates a salt using bcrypt's genSalt method. A salt is a random string that is added to the password before hashing to enhance security. The number 10 indicates the cost factor, which determines how computationally expensive the hashing process will be (higher values are more secure but take more time).
    const hashedPassword = await bcrypt.hash(password, salt);    // This line hashes the user's password using bcrypt's hash method. It takes the plain text password and the generated salt as inputs and produces a hashed version of the password, which will be stored in the database instead of the plain text password for security reasons.


    // create user

    // This block of code creates a new user in the database using Prisma's create method. It takes an object with a data property that contains the user's name, email, and the hashed password. The created user object is then stored in the variable user.
    const user = await prisma.users.create({
        data: {
            username,
            email,
            password: hashedPassword,
            display_name
        },
    });

                // GENERATE TOKEN JWT ICI AVANT DE SEND LE STATUS

    const token = generateToken(user.id, res);
    
    res.status(201).json({
        status: "success",
        data: {                     // user is not our array in the database, but the user we just created and stored in the variable user. 
            user: {                 // This part of the code sends a JSON response back to the client with a status code of 201 (Created). The response includes a status message and a data object that contains the user's id, name, and email. Note that the password is not included in the response for security reasons.
                id: user.id,        // user.id and not users.id because we are returning only one user, not an array of users. If we were returning multiple users, we would use users.id to access the id of each user in the array.
                username: username,
                email: email,
            },
            token,
        },
    });
} catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'){
                // P2002 = Unique constraint failed
            return res.status(409).json({
            error: "Username already taken"
        });
        }
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// en login fonction on utilise jwt authentification

const login = async(req, res) => {
    const { email, password } = req.body; 


        // Check if user email exists in the table
    const user = await prisma.users.findUnique({          // This line checks if a user with the provided email already exists in the database. It uses Prisma's findUnique method to search for a user where the email matches the one provided in the request body.
            where: {email: email},
    });

    // pour verifier l'email
    if (!user) {
        return res                  // faire return pour ne pas continuer la fonction
        .status(401)
        .json({error: "Invalid email or password"}) 
    };


    // verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);  // comparer
                                                                            // "password" - password entré
                                                                            // "user.password" - password en tableau
                                                                            // "user.password" et pas "users.password" parce que j'ai mis tableau "users" en variable "user"
                                                                            //  const user = await prisma.users.findUnique({          
                                                                            //  where: {email: email},
                                                                            //  });


    if (!isPasswordValid) {
        return res                  // faire return pour ne pas continuer la fonction
        .status(401)
        .json({error: "Invalid email or password"}) 
    }



                    /* GENERATE TOKEN FOR JWT */

    // Generate JWT token (JSON Web Token) for authentication. This token will be used to verify the user's identity in subsequent requests to protected routes. The token is typically generated using a secret key and includes the user's id and email as payload.
    // npm i jsonwebtoken
    // helper fonction to generate token is in folder "utils"


        const token = generateToken(user.id, res);         // il faut le mettre en register et en login


        res.status(201).json({
        status: "success",
        data: {                     
            user: {                 
                id: user.id,        
                email: email,
            },
            token,                      // il faut le mettre en register et en login
        },
    });
};

const logout = async(req, res) => {
    
    // in log out we do first param - "jwt" equal to "" - vide string
    res.cookie("jwt", "", {         
        httpOnly: true,
        expires: new Date(0),               // Date(0) - time right now, when i clicked log out
    });


    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
}


export { register, login, logout }
