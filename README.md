<<<<<<< HEAD
Fullstack GameGuide site
=======
# 🎮 GuideProjet - Game Guide Platform
>>>>>>> 2acb099 (Created README file)

![GuideProjet Banner](https://img.shields.io/badge/Project-Guide_Projet-blueviolet?style=for-the-badge&logo=gamepad)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)

<<<<<<< HEAD
https://guideprojet.onrender.com

=======
**GuideProjet** is a comprehensive full-stack web application that allows users to create, discover, and interact with professional game guides. Whether you're a hardcore gamer looking for a strategy or a creator wanting to share your knowledge, GuideProjet provides the perfect platform.

🚀 **Live Demo**: [guideprojet.onrender.com](https://guideprojet.onrender.com)

---

## ✨ Features

### 🖥️ Frontend
- **Responsive Interface**: Crafted with Vanilla HTML5, CSS3, and JavaScript for a fast and fluid experience across all devices.
- **User Dashboard**: Manage your own guides, profile settings, and social connections.
- **Interactive Guide Creator**: Easily draft and publish guides with images.
- **Social Engagement**: Like guides, follow your favorite creators, and save guides to your favorites.
- **Dynamic Search**: Find guides for specific games effortlessly.

### ⚙️ Backend
- **Robust API**: RESTful architecture built with Node.js and Express.js.
- **Secure Authentication**: Implementation of JWT (JSON Web Tokens) and bcryptjs for secure user sessions and password hashing.
- **Database Management**: Powered by Prisma ORM for efficient MySQL interactions.
- **File Uploads**: Integration with Multer for handling profile avatars and guide images.
- **Real-time Handling**: Modern middleware for CORS, cookie parsing, and error management.

---

## 🛠️ Technology Stack

| **Area**      | **Technologies**                                                                 |
|---------------|---------------------------------------------------------------------------------|
| **Frontend**  | HTML5, CSS3, JavaScript (ES6+), Vanilla components                              |
| **Backend**   | Node.js, Express.js                                                             |
| **ORM**       | Prisma                                                                          |
| **Database**  | MySQL                                                                           |
| **Security**  | JWT, bcryptjs, Cookie-parser                                                    |
| **Utilities** | Multer (Uploads), Dayjs (Dates), Dotenv                                         |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL Database

### Installation

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd Projet-Backend
   ```

2. **Backend Setup**:
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `server` directory:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/guide_db"
   JWT_SECRET="your_secret_key"
   ```

4. **Initialize Database**:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Run the Project**:
   ```bash
   # From the server directory
   npm start
   ```

---

## 📂 Project Structure

- `/client`: Frontend assets (HTML, CSS, JS)
- `/server`: Backend source code, Prisma schema, and API routes
- `/server/src`: Express controllers, middlewares, and business logic
- `/server/prisma`: Database schema and migrations

---

## 📜 License
This project is licensed under the **ISC License**.

---
*Developed with ❤️ by Sainaro*
>>>>>>> 2acb099 (Created README file)
