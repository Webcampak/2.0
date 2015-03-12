-- MySQL dump 10.13  Distrib 5.1.41, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: webcampak
-- ------------------------------------------------------
-- Server version	5.1.41-3ubuntu12.7

-- DROP DATABASE webcampak;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `webcampak`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `webcampak` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `webcampak`;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
-- INSERT INTO `companies` VALUES (1,'Eurotechnia'),(2,'Infracom'),(3,'Webcampak Cloud');
INSERT INTO `companies` VALUES (1, 'Eurotechnia');
INSERT INTO `companies` VALUES (2, 'Infracom');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
-- INSERT INTO `groups` VALUES (1,'root'),(3,'user'),(4,'Demo'),(5,'Webcampak Cloud');
INSERT INTO `groups` VALUES (1, 'root');
INSERT INTO `groups` VALUES (2, 'admin');
INSERT INTO `groups` VALUES (3, 'user');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups_pages`
--

DROP TABLE IF EXISTS `groups_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groups_id` int(11) NOT NULL,
  `pages_id` int(11) NOT NULL,
  `access` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--
LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (10, 'auth.base.sources');
INSERT INTO `pages` VALUES (12, 'auth.base.lang');

INSERT INTO `pages` VALUES (30, 'auth.stats');
INSERT INTO `pages` VALUES (31, 'auth.stats.system');
INSERT INTO `pages` VALUES (32, 'auth.stats.sources.disk');
INSERT INTO `pages` VALUES (33, 'auth.stats.pictures.files');
INSERT INTO `pages` VALUES (34, 'auth.stats.pictures.size');
INSERT INTO `pages` VALUES (35, 'auth.sensors');

INSERT INTO `pages` VALUES (50, 'auth.view.pictures');
INSERT INTO `pages` VALUES (51, 'auth.view.pictures.email');
INSERT INTO `pages` VALUES (52, 'auth.view.pictures.comment');

INSERT INTO `pages` VALUES (70, 'auth.view.videos');

INSERT INTO `pages` VALUES (90, 'auth.config');
INSERT INTO `pages` VALUES (91, 'auth.config.logs');
-- INSERT INTO `pages` VALUES (92, 'auth.config.cloud');
-- INSERT INTO `pages` VALUES (93, 'auth.config.cloud.read');
-- INSERT INTO `pages` VALUES (94, 'auth.config.cloud.write');
INSERT INTO `pages` VALUES (95, 'auth.config.instantcapture');

INSERT INTO `pages` VALUES (110, 'auth.config.sources');
INSERT INTO `pages` VALUES (111, 'auth.config.sources.read');
INSERT INTO `pages` VALUES (112, 'auth.config.sources.write');

-- INSERT INTO `pages` VALUES (130, 'auth.config.admin.cloud');
INSERT INTO `pages` VALUES (131, 'auth.config.admin.general');
INSERT INTO `pages` VALUES (132, 'auth.config.admin.permissions');
INSERT INTO `pages` VALUES (133, 'auth.config.admin.reboot');
INSERT INTO `pages` VALUES (134, 'auth.config.admin.connecteddevices');
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sources`
--

DROP TABLE IF EXISTS `sources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sourceid` int(11) NOT NULL COMMENT 'Webcampak source ID',
  `name` varchar(255) NOT NULL,
  `weight` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sources`
--

LOCK TABLES `sources` WRITE;
/*!40000 ALTER TABLE `sources` DISABLE KEYS */;
INSERT INTO `sources` VALUES (1,1,'Source 1',1);
/*!40000 ALTER TABLE `sources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sources_groups`
--

DROP TABLE IF EXISTS `sources_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sources_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `usergroup` varchar(255) NOT NULL,
  `permission` varchar(255) NOT NULL,  
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sources_groups`
--

LOCK TABLES `sources_groups` WRITE;
/*!40000 ALTER TABLE `sources_groups` DISABLE KEYS */;
INSERT INTO `sources_groups` VALUES (1,'root','1', 'rw');
INSERT INTO `sources_groups` VALUES (2,'root','admin', '');
-- INSERT INTO `sources_groups` VALUES (1,'root','1', 'rw'), (2,'root','admin');
/*!40000 ALTER TABLE `sources_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`username` varchar(100) DEFAULT NULL,
	`password` varchar(255) DEFAULT NULL,
	`firstname` varchar(255) DEFAULT NULL,
	`lastname` varchar(255) DEFAULT NULL,
	`email` varchar(255) DEFAULT NULL,
	`companies_id` int(11) DEFAULT NULL,
	`groups_id` int(11) DEFAULT NULL,
	`lang` varchar(255) DEFAULT NULL,	
	`invoice` varchar(255) DEFAULT NULL,
	`cloud` varchar(255) DEFAULT NULL,	
	`expirydate` int(11) DEFAULT NULL, 
 	`lastlogin` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'root','aa7c11d711c0fd8be9b665f3d3b76f7e351b74ed','Root','Root','support@webcampak.com',0,1,'en','na',NULL, NULL, NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `sources`
--

DROP TABLE IF EXISTS `pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pictures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sourceid` int(11) NOT NULL,
  `picturename` varchar(255) NOT NULL,
  `comment` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2010-11-19 19:22:29

-- CREATE user "mysqlwebcampak"@"localhost";
-- SET password FOR "mysqlwebcampak"@"localhost" = password("a1z2e3r4t5y6u7i8o9p0");
-- GRANT ALL ON webcampak.* TO "mysqlwebcampak"@"localhost";
