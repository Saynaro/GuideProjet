import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    // chercher des jeux exists
    const game1 = await prisma.games.findFirst({ where: { title: "Valorant" } });
    const game2 = await prisma.games.findFirst({ where: { title: "Apex Legends" } });

    // chercher des users exists
    const user1 = await prisma.users.findUnique({ where: { email: "test@example.com" } });
    const user2 = await prisma.users.findUnique({ where: { email: "khalid@gmail.com" } });

    // Verifier si tous est trouvé
    if (!game1 || !game2 || !user1 || !user2) {
        throw new Error("Des users ou jeux n'a pas trouvé");
    }

    // Creer des guides
    await prisma.guides.createMany({
        data: [
            {
                user_id: user1.id,
                game_id: game1.id,
                title: "Guide 1 for Game 1",
                content: "Guide 1 pour  Game 1"
            },
            {
                user_id: user1.id,
                game_id: game1.id,
                title: "Guide 2 for Game 1",
                content: "Guide2 pour Game 1"
            },
            {
                user_id: user2.id,
                game_id: game2.id,
                title: "Guide 1 for Game 2",
                content: "Guide 1 pour Game 2"
            }
        ]
    });

    console.log("Seed completed!");
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());












// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const games = [
//     { 
//         cover: 'BG3-02.png',
//         title: 'BG3'
//     },
//     {
        
//         cover: 'MHW.png',
//         title: 'BG3'
//     },
//     {
        
//         cover: 'PokeMMO-01.png',
//         title: 'BG3'
//     },
//     {
        
//         cover: 'Poe2.png',
//         title: 'BG3'
//     },
//     {
        
//         cover: 'LOL-Gwen.png',
//         title: 'BG3'
//     },
//     {
        
//         cover: '2XKO-VI.png',
//         title: 'BG3'
//     },
//     {
        
//         cover: 'Valorant.jpg',
//         title: 'Valorant'
//     },
//     {
        
//         cover: 'Apex-Legends.jpg',
//         title: 'Apex Legends'
//     },
//     {
        
//         cover: 'hades.jpg',
//         title: 'Hades'
//     },
//     {
        
//         cover: 'Stardew-valley.png',
//         title: 'Stardew valley'
//     },
//     {
        
//         cover: 'Portal2.png',
//         title: 'Portal2'
//     },
//     {
        
//         cover: 'SilkSong.png',
//         title: 'SilkSong'
//     },
//     {
        
//         cover: 'SilkSong.png',
//         title: 'BG3'
//     },
//     {
        
//         cover: 'Stardew-valley.png',
//         title: 'Stardew valley'
//     },
//     {
        
//         cover: 'Apex-Legends.jpg',
//         title: 'Apex Legends'
//     },
//     {
        
//         cover: 'BG3-02.png',
//         title: 'BG3'
//     },
//     {
        
//         cover: '2XKO-VI.png',
//         title: '2XKO VI'
//     },
//     {
//         cover: 'The-Finals.png',
//         title: 'The Finals'
//     },
//     {
//         cover: 'Civ-7.png',
//         title: 'Civ 7'
//     }
// ];

// const main = async () => {
//     console.log("Start seeding");
//     for (const game of games){
//         await prisma.games.create({
//             data:game,
//         });
//     console.log(`Created game ${game.title}`);
//     };
//     console.log("Seeding completed");
// };

// main().catch((err) => {
//     console.error(err);
//     process.exit(1);
// }).finally(async () => {
//     await prisma.$disconnect();
// })