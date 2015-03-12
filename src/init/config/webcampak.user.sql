-- MySQL dump 10.13  Distrib 5.1.41, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: webcampak
-- ------------------------------------------------------
-- Server version	5.1.41-3ubuntu12.7


CREATE user "mysqlwebcampak"@"localhost";
SET password FOR "mysqlwebcampak"@"localhost" = password("tmpmysqlpassword");
GRANT ALL ON webcampak.* TO "mysqlwebcampak"@"localhost";
