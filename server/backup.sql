-- MySQL dump 10.13  Distrib 9.6.0, for macos26.2 (arm64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	12.1.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `favorite_guides`
--

DROP TABLE IF EXISTS `favorite_guides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40000 ALTER TABLE `favorite_guides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `games` VALUES (3,'BG3',NULL,'BG3-02.png','2026-02-19 12:20:34'),(4,'MHW',NULL,'MHW.png','2026-02-19 12:20:34'),(5,'PokeMMO',NULL,'PokeMMO-01.png','2026-02-19 12:20:34'),(6,'Poe2',NULL,'Poe2.png','2026-02-19 12:20:34'),(7,'Leagues of legends',NULL,'LOL-Gwen.png','2026-02-19 12:20:34'),(8,'2XKO VI',NULL,'2XKO-VI.png','2026-02-19 12:20:34'),(9,'Valorant',NULL,'Valorant.jpg','2026-02-19 12:20:34'),(10,'Apex Legends',NULL,'Apex-Legends.jpg','2026-02-19 12:20:34'),(11,'Hades',NULL,'hades.jpg','2026-02-19 12:20:34'),(12,'Stardew valley',NULL,'Stardew-valley.png','2026-02-19 12:20:34'),(13,'Portal2',NULL,'Portal2.png','2026-02-19 12:20:34'),(14,'SilkSong',NULL,'SilkSong.png','2026-02-19 12:20:34'),(20,'The Finals',NULL,'The-Finals.png','2026-02-19 12:20:34'),(21,'Civ 7',NULL,'Civ-7.png','2026-02-19 12:20:34');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guide_likes`
--

DROP TABLE IF EXISTS `guide_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40000 ALTER TABLE `guide_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guides`
--

DROP TABLE IF EXISTS `guides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guides`
--

LOCK TABLES `guides` WRITE;
/*!40000 ALTER TABLE `guides` DISABLE KEYS */;
INSERT INTO `guides` VALUES (28,6,4,'Game 1','test',0,'2026-02-23 15:34:36','[\"images-1771864476445-20465132.jpg\"]'),(29,6,3,'Game 1','testing',0,'2026-02-23 15:35:31','[\"images-1771864531673-369346089.jpg\"]'),(30,6,3,'Game 2','exemple',0,'2026-02-23 15:36:15','[\"images-1771864575923-123944433.jpg\"]'),(31,6,3,'Game 3','Testing',0,'2026-02-23 15:37:07','[\"images-1771864627972-627133355.jpg\"]'),(34,15,5,'GAME 1','game',0,'2026-02-23 15:47:41','[\"images-1771865261516-951186453.jpg\"]'),(35,6,6,'Guide essai','un test de la fonctionnalité',0,'2026-02-24 11:33:24','[]'),(36,6,5,'Guide','EXEMPLE',0,'2026-02-24 12:02:09','[\"images-1771938129830-597201590.jpg\"]'),(37,6,5,'qsd','ax',0,'2026-02-24 12:02:51','[]'),(38,6,6,'Test','Test',0,'2026-02-24 12:03:13','[\"images-1771938193861-206338044.jpg\"]'),(41,6,6,'fyg','hvhv',0,'2026-02-24 12:13:13','[]'),(42,6,6,'asd','ads',0,'2026-02-24 12:13:46','[]'),(43,6,6,'test','test',0,'2026-02-24 12:28:34','[]'),(46,6,4,'Test','TE8YAGIU\r\nADOUAOJD\r\nazeihdcoazie\r\neaczanelefjnc\r\nceoaizocne\r\nzcepihcaoz\r\ncezpi',0,'2026-02-24 14:26:51','[\"images-1771946811641-719179771.jpg\"]'),(47,6,4,'ads','adsd',0,'2026-02-24 14:27:54','[]'),(48,6,4,'zeacaze','zecazec',0,'2026-02-24 14:28:08','[\"images-1771946888654-599732348.jpg\"]'),(52,6,6,'GAME 7','EXEMPLE',0,'2026-02-24 17:08:10','[\"images-1771956490914-439264039.jpg\"]'),(54,6,11,'TEST','TEST',0,'2026-02-24 17:11:11','[\"images-1771956671373-333275713.jpg\"]'),(55,6,10,'GAME 1','GAME\r\nELAF\r\nAEF2',0,'2026-02-24 17:12:21','[\"images-1771956741225-416056795.jpg\"]'),(56,6,9,'TEST','TESTING',0,'2026-02-24 17:19:16','[\"images-1771957156955-540428961.jpg\"]'),(57,6,9,'TEST','TEST',0,'2026-02-24 17:20:22','[\"images-1771957222030-793561121.jpg\"]'),(58,6,6,'GAME','GAME',0,'2026-02-24 17:20:42','[\"images-1771957242516-207976991.jpg\"]'),(59,6,6,'TEST','TEST',0,'2026-02-24 17:22:22','[\"images-1771957342568-201463676.jpg\"]'),(60,6,6,'НУВ','ШУВГТ',0,'2026-02-24 17:24:49','[\"images-1771957489615-334415594.jpg\"]'),(61,6,6,'GALE','GAME',0,'2026-02-24 17:25:45','[\"images-1771957545132-978370739.jpg\"]'),(62,6,6,'TEST','TEST',0,'2026-02-24 17:29:26','[\"images-1771957766664-947236701.jpg\"]'),(63,6,6,'TEST','TEST',0,'2026-02-24 17:29:34','[]'),(64,6,6,'TEST','TEST',0,'2026-02-24 17:34:11','[\"images-1771958051410-890431633.jpg\"]'),(65,6,6,'TEST','TEST',0,'2026-02-24 17:34:32','[\"images-1771958072423-955731260.jpg\"]'),(66,6,6,'TEST','TEST',0,'2026-02-24 17:40:00','[\"images-1771958400329-612669891.jpg\"]'),(67,6,6,'TEST','TEST',0,'2026-02-24 17:40:16','[\"images-1771958416742-27590565.jpg\"]'),(68,6,6,'JANX','aizjxnA',0,'2026-02-24 17:41:57','[\"images-1771958517460-483436689.jpg\"]'),(69,6,6,'TEST','TEST',0,'2026-02-24 17:43:24','[\"images-1771958604432-6670772.jpg\"]'),(72,6,6,'TEST','TEST',0,'2026-02-24 17:48:13','[\"images-1771958893131-663965126.jpg\"]'),(74,6,6,'TEST','TEST',0,'2026-02-24 17:53:33','[\"images-1771959213694-84743335.jpg\"]'),(84,6,6,'TEST','TEST',0,'2026-02-26 12:45:54','[\"images-1772113554731-150377998.jpg\"]'),(85,6,6,'GAME 10','GAME10\r\nadaezazd\r\nzaedzec\r\nzferfxaezx\r\nzecafze\r\nzexeza\r\nazdeafez',0,'2026-03-03 08:50:09','[\"images-1772531409009-92952164.jpg\"]'),(87,38,3,'Guide 1','Guide contenu\r\ncontenu 1\r\ncontenu 2\r\ncontenu 3\r\netc.',0,'2026-03-04 14:08:47','[\"images-1772636927796-743994724.jpg\"]'),(89,38,10,'Guide1','Contenu du Guide1',0,'2026-03-04 14:40:19','[]');
/*!40000 ALTER TABLE `guides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_follows`
--

DROP TABLE IF EXISTS `user_follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40000 ALTER TABLE `user_follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_games`
--

DROP TABLE IF EXISTS `user_games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40000 ALTER TABLE `user_games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'Khalid','khalid@gmail.com','$2b$10$29tG7XxnohL2mr67EkixrObY0NFhRgrG51GK7Lv0zVXV9WYbvwB06','avatar-1772531565844-62459501.jpg','cover-1772113489916-572296205.png','BONJOUR','2026-02-19 09:47:03','Khalid55'),(15,'Test','test@test.fr','$2b$10$ScDc2Km/nyzSCM2iF4VEUenHvadrw7tHtnLt49L/hDzYF/ezPpfS2',NULL,NULL,NULL,'2026-02-23 15:45:44','Testing account'),(27,'Sainaro','khalid.cizdoev777@gmail.com','$2b$10$3xGLXbyAt2soRZ7i1fQyteprdVA0CyFkA4W2qD5yYNSXVNQ0.mxCO',NULL,NULL,NULL,'2026-03-04 13:45:07','Sainaro'),(38,'ETSTTS','khalidsainaro@gmail.com','$2b$10$UCKdkMVT0V7o5tl9UgvV7eNV/9Ac8FF8Oa/dQLXjfQ9L4WPyrmCtu','avatar-1772636461126-888640963.jpg','cover-1772636461134-290165061.jpg','Bonjour a tous','2026-03-04 13:59:40','sainaro'),(39,'khalid123','khalid.sainaro@gmail.com','$2b$10$lzgZcs.jb/B.C4EgOcSPg.84uQdM0mYW/9g0gzVyvLFALEk3Gok7W',NULL,NULL,NULL,'2026-03-04 14:27:45','Khalid Sainaro');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-05 12:43:30
