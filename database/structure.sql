-- MySQL dump 10.13  Distrib 5.7.41, for Win32 (AMD64)
--
-- Host: localhost    Database: malva
-- ------------------------------------------------------
-- Server version	5.7.41-log

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `ID_ADDRESS` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador unico de domicilios',
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `zipCode` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`ID_ADDRESS`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='en esta tabla se almacenan los domicilios de los usuarios';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `ID_CATEGORIES` int(11) NOT NULL AUTO_INCREMENT COMMENT 'identificador unico de la tabla',
  `NAME` varchar(100) NOT NULL COMMENT 'nombres de las categorias',
  `IMAGE` varchar(255) DEFAULT NULL COMMENT 'imagenes que identifiquen las categorias',
  `createdAt` date NOT NULL,
  `UpdatedAt` date DEFAULT NULL,
  PRIMARY KEY (`ID_CATEGORIES`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='En esta tabla se almacenan las categorias de los productos.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `ID_IMAGES` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador unico de imagenes',
  `name` varchar(255) NOT NULL,
  `ID_PRODUCTS` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`ID_IMAGES`),
  KEY `images_FK` (`ID_PRODUCTS`),
  CONSTRAINT `images_FK` FOREIGN KEY (`ID_PRODUCTS`) REFERENCES `products` (`ID_PRODUCTS`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='En esta tabla se almacenan las imagenes de los productos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `ID_ITEM` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador unico para la tabla items',
  `quantity` int(11) NOT NULL,
  `ID_PRODUCTS` int(11) NOT NULL,
  `ID_ORDER` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`ID_ITEM`),
  KEY `items_FK` (`ID_PRODUCTS`),
  KEY `items_FK_2` (`ID_ORDER`),
  CONSTRAINT `items_FK` FOREIGN KEY (`ID_PRODUCTS`) REFERENCES `products` (`ID_PRODUCTS`),
  CONSTRAINT `items_FK_1` FOREIGN KEY (`ID_ORDER`) REFERENCES `orders` (`ID_ORDER`),
  CONSTRAINT `items_FK_2` FOREIGN KEY (`ID_ORDER`) REFERENCES `orders` (`ID_ORDER`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='En esta tabla se almacenan items de productos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `ID_ORDER` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `total` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `process` varchar(45) NOT NULL,
  PRIMARY KEY (`ID_ORDER`),
  KEY `orders_FK` (`ID_USER`),
  CONSTRAINT `orders_FK` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID_USER`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Esta tabla contiene el registro de ordenes';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `ID_PRODUCTS` int(11) NOT NULL AUTO_INCREMENT COMMENT 'identificador unico de productos',
  `Name` varchar(255) NOT NULL COMMENT 'Nombre de producto',
  `price` int(11) NOT NULL,
  `Brand` varchar(255) NOT NULL,
  `Description` text NOT NULL COMMENT 'Descripcion del producto',
  `Discount` int(11) DEFAULT NULL,
  `ID_CATEGORIES` int(11) NOT NULL,
  `material` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`ID_PRODUCTS`),
  KEY `products_FK` (`ID_CATEGORIES`),
  CONSTRAINT `products_FK` FOREIGN KEY (`ID_CATEGORIES`) REFERENCES `categories` (`ID_CATEGORIES`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='En esta tabla se almacenan los productos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rols` (
  `ID_ROL` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador unico de rol',
  `name` varchar(255) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`ID_ROL`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Esta tabla registra el rol del usuario';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `ID_USER` int(11) NOT NULL AUTO_INCREMENT COMMENT 'identificador unico de usuarios',
  `name` varchar(255) NOT NULL COMMENT 'Nombre de usuario',
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `ID_ADDRESS` int(11) NOT NULL,
  `ID_ROL` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_USER`),
  KEY `users_FK` (`ID_ADDRESS`),
  KEY `users_FK_1` (`ID_ROL`),
  CONSTRAINT `users_FK` FOREIGN KEY (`ID_ADDRESS`) REFERENCES `addresses` (`ID_ADDRESS`),
  CONSTRAINT `users_FK_1` FOREIGN KEY (`ID_ROL`) REFERENCES `rols` (`ID_ROL`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Esta tabla almacena el registro de usuarios';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'malva'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-14  8:10:06
