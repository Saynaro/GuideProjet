/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.1.2-MariaDB, for osx10.21 (arm64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	12.1.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `favorite_guides`
--

DROP TABLE IF EXISTS `favorite_guides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite_guides` (
  `user_id` int(11) NOT NULL,
  `guide_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`,`guide_id`),
  KEY `favorite_guides_guide_id_fkey` (`guide_id`),
  CONSTRAINT `favorite_guides_guide_id_fkey` FOREIGN KEY (`guide_id`) REFERENCES `guides` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favorite_guides_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_guides`
--

LOCK TABLES `favorite_guides` WRITE;
/*!40000 ALTER TABLE `favorite_guides` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `favorite_guides` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `games` VALUES
(3,'BG3',NULL,'BG3-02.png','2026-02-19 12:20:34'),
(4,'BG3',NULL,'MHW.png','2026-02-19 12:20:34'),
(5,'BG3',NULL,'PokeMMO-01.png','2026-02-19 12:20:34'),
(6,'BG3',NULL,'Poe2.png','2026-02-19 12:20:34'),
(7,'BG3',NULL,'LOL-Gwen.png','2026-02-19 12:20:34'),
(8,'BG3',NULL,'2XKO-VI.png','2026-02-19 12:20:34'),
(9,'Valorant',NULL,'Valorant.jpg','2026-02-19 12:20:34'),
(10,'Apex Legends',NULL,'Apex-Legends.jpg','2026-02-19 12:20:34'),
(11,'Hades',NULL,'hades.jpg','2026-02-19 12:20:34'),
(12,'Stardew valley',NULL,'Stardew-valley.png','2026-02-19 12:20:34'),
(13,'Portal2',NULL,'Portal2.png','2026-02-19 12:20:34'),
(14,'SilkSong',NULL,'SilkSong.png','2026-02-19 12:20:34'),
(15,'BG3',NULL,'SilkSong.png','2026-02-19 12:20:34'),
(16,'Stardew valley',NULL,'Stardew-valley.png','2026-02-19 12:20:34'),
(17,'Apex Legends',NULL,'Apex-Legends.jpg','2026-02-19 12:20:34'),
(18,'BG3',NULL,'BG3-02.png','2026-02-19 12:20:34'),
(19,'2XKO VI',NULL,'2XKO-VI.png','2026-02-19 12:20:34'),
(20,'The Finals',NULL,'The-Finals.png','2026-02-19 12:20:34'),
(21,'Civ 7',NULL,'Civ-7.png','2026-02-19 12:20:34');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `guide_likes`
--

DROP TABLE IF EXISTS `guide_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `guide_likes` (
  `user_id` int(11) NOT NULL,
  `guide_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`,`guide_id`),
  KEY `guide_likes_guide_id_fkey` (`guide_id`),
  CONSTRAINT `guide_likes_guide_id_fkey` FOREIGN KEY (`guide_id`) REFERENCES `guides` (`id`) ON DELETE CASCADE,
  CONSTRAINT `guide_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guide_likes`
--

LOCK TABLES `guide_likes` WRITE;
/*!40000 ALTER TABLE `guide_likes` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `guide_likes` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `guides`
--

DROP TABLE IF EXISTS `guides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `guides` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `content` text NOT NULL,
  `likes_count` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `guides_user_id_fkey` (`user_id`),
  KEY `guides_game_id_fkey` (`game_id`),
  CONSTRAINT `guides_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE,
  CONSTRAINT `guides_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guides`
--

LOCK TABLES `guides` WRITE;
/*!40000 ALTER TABLE `guides` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `guides` VALUES
(5,6,10,'Guide 1 for Game 2','Guide 1 pour Game 2',0,'2026-02-19 13:18:08',NULL),
(6,6,5,'czdeverf','JIIHB',0,'2026-02-22 18:50:35','Снимок экрана 2026-02-17 в 11.01.21.png'),
(7,6,5,'czdeverf','JIIHB\ndazedcedzcze\nerfvervfre\nfefrelvnfrojnvfjiebojgfbogeijncvejnvhervjbfryutbvçurnçungvunevjnifnfirnfhbvrv dejciebçvufçvbçefbvehbfrvhutbvhvbruhfbvujncj rnjvfnvjbgbvurdvnjncdixndjvbfurbvjnccdudjnkc,jncvruvurbfbr!vf!ujvhr!huf!fvybf(vy!!byfbbf',0,'2026-02-22 18:51:30','Снимок экрана 2026-02-17 в 11.01.21.png'),
(8,6,3,'ijcanzojd czoje ','jazdcncjnzejcd',0,'2026-02-22 19:14:11','Снимок экрана 2026-02-17 в 11.01.16.png'),
(9,6,3,'oezndcejblz','hjcbelzacdhjcn elé\"jc',0,'2026-02-22 19:16:42','Снимок экрана 2026-02-17 в 11.00.46.png'),
(10,6,5,'Outer wilds','uizbcbodzjb',0,'2026-02-22 19:22:05','Outer-Wilds.png'),
(11,6,3,'kdzenfoc','zecoinoz',0,'2026-02-22 20:33:52','[\"images-1771796032384-436846430.png\"]'),
(12,6,3,'jezaicbaj','UBIAZUBKXJBXZ',0,'2026-02-22 20:41:41','[\"images-1771796501593-155511850.png\"]'),
(13,6,4,'White','hxzbuczzxsz',0,'2026-02-22 20:53:47','[\"images-1771797227447-248520829.jpg\"]'),
(14,6,3,'czjhde jhec','edczhnihe dcz',0,'2026-02-22 20:55:20','[\"images-1771797320786-261156433.jpg\"]'),
(15,6,4,'reincoeunvz','ijzdnviejnd',0,'2026-02-22 21:16:09','[\"images-1771798569940-293268674.jpg\"]'),
(16,6,4,'uhiurefzvcun','UHUABDIUB',0,'2026-02-22 21:21:18','[\"images-1771798878622-706022331.jpg\"]'),
(17,6,4,'ШЙШИТГОЧТ','UBIBDIAXN',0,'2026-02-22 21:24:14','[\"images-1771799054429-480722095.jpg\"]'),
(18,6,4,'zebcajbe','ehcabkbezc',0,'2026-02-22 21:28:49','[\"images-1771799329026-104729414.jpg\"]'),
(19,6,6,'zibecaibdcz','ecizniubc\"e',0,'2026-02-22 21:39:29','[\"images-1771799969678-127632422.png\"]'),
(20,6,6,'Path of survival','JNAJKNCLK\r\ndec,zkzenkl\r\n-zvevczefv\r\nv--zevrze ze\r\n-erfzerf',0,'2026-02-22 21:55:32','[\"images-1771800932138-774906356.jpg\"]'),
(21,6,6,'zedfzcac','zadcza',0,'2026-02-22 22:05:24','[\"images-1771801524884-60255209.jpg\"]'),
(22,6,3,'TEST','TESTING',0,'2026-02-23 14:19:41','[\"images-1771859981230-909017415.png\"]');
/*!40000 ALTER TABLE `guides` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `user_follows`
--

DROP TABLE IF EXISTS `user_follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_follows` (
  `follower_id` int(11) NOT NULL,
  `following_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`follower_id`,`following_id`),
  KEY `user_follows_following_id_fkey` (`following_id`),
  CONSTRAINT `user_follows_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_follows_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_follows`
--

LOCK TABLES `user_follows` WRITE;
/*!40000 ALTER TABLE `user_follows` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `user_follows` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `user_games`
--

DROP TABLE IF EXISTS `user_games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_games` (
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`game_id`),
  KEY `user_games_game_id_fkey` (`game_id`),
  CONSTRAINT `user_games_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_games_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_games`
--

LOCK TABLES `user_games` WRITE;
/*!40000 ALTER TABLE `user_games` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `user_games` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `display_name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`),
  UNIQUE KEY `users_username_key` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `users` VALUES
(5,'aezd','exemple@gmail.com','$2b$10$G.kny6taT65dmeQs6zfEjOU1SGFIJN8uCvlj5awgy5tXwgYj/Jjvi','avatar.png',NULL,NULL,'2026-02-19 09:06:40','Khalid'),
(6,'Khalid','khalid@gmail.com','$2b$10$VtFtpbkSTaUiMB04ODglhOIZ/AJ0o0lWQ0ABQqbrts1zfjKYE36Da','avatar.png','Banniere-Poe2.png','Bonjour, it\'s an exemple of description','2026-02-19 09:47:03','Khalid123'),
(7,'user1','user1@example.com','hashedpassword',NULL,NULL,NULL,'2026-02-19 13:11:08','User One'),
(8,'user2','user2@example.com','hashedpassword',NULL,NULL,NULL,'2026-02-19 13:11:08','User Two'),
(14,'sainaro123','sainaroev@gmail.com','$2b$10$/x1snvQ5FDzx5XJWeklGmODqd8kQ11qFZpvDwHDaLfZG..0uDLX.2',NULL,NULL,NULL,'2026-02-22 15:09:30','Sainaro');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Dumping routines for database 'project'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-02-23 16:24:46
