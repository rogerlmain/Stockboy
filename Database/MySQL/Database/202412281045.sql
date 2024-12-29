-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: stockboy
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `activity_view`
--

DROP TABLE IF EXISTS `activity_view`;
/*!50001 DROP VIEW IF EXISTS `activity_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `activity_view` AS SELECT 
 1 AS `id`,
 1 AS `user_id`,
 1 AS `broker_id`,
 1 AS `ticker_id`,
 1 AS `broker`,
 1 AS `symbol`,
 1 AS `company`,
 1 AS `cost_price`,
 1 AS `current_price`,
 1 AS `quantity`,
 1 AS `transaction_type`,
 1 AS `transaction_date`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `brokers`
--

DROP TABLE IF EXISTS `brokers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brokers` (
  `id` varchar(36) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brokers`
--

LOCK TABLES `brokers` WRITE;
/*!40000 ALTER TABLE `brokers` DISABLE KEYS */;
INSERT INTO `brokers` VALUES ('80e43ec8-016a-453d-b4ff-80d9d79a2bc7','Robinhood',1,0),('87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','Fidelity',1,0);
/*!40000 ALTER TABLE `brokers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dividends`
--

DROP TABLE IF EXISTS `dividends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dividends` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `broker_id` varchar(36) NOT NULL,
  `ticker_id` varchar(36) NOT NULL,
  `issue_date` date NOT NULL,
  `amount_per_share` decimal(14,6) NOT NULL,
  `share_quantity` decimal(14,6) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_dividends_to_users` (`user_id`),
  KEY `FK_dividends_to_brokers` (`broker_id`),
  KEY `FK_dividends_to_tickers` (`ticker_id`),
  CONSTRAINT `FK_dividends_to_brokers` FOREIGN KEY (`broker_id`) REFERENCES `brokers` (`id`),
  CONSTRAINT `FK_dividends_to_tickers` FOREIGN KEY (`ticker_id`) REFERENCES `tickers` (`id`),
  CONSTRAINT `fk_dividends_to_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dividends`
--

LOCK TABLES `dividends` WRITE;
/*!40000 ALTER TABLE `dividends` DISABLE KEYS */;
INSERT INTO `dividends` VALUES ('020be455-8082-40f9-a12a-af371fc57870','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288','2022-01-03',0.150000,1.000000,0),('02fad41e-56b6-4acd-8d9a-d74599a79253','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-08-30',0.165000,0.055000,0),('0c9e0a07-0c07-41e1-8163-c74de47b04b2','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924','2024-02-26',0.080000,51.951900,0),('10096a94-4bc1-4450-a108-72e9d5575877','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288','2023-04-03',0.160000,1.000000,0),('10c794b8-3351-4664-8d9f-a57c9f8e1f86','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924','2024-04-25',0.080000,76.344400,0),('10c8fb2e-d488-4be2-a853-83bbbd4b9141','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6','2024-04-18',0.150000,85.487000,0),('10d9b974-6b52-412f-8f15-e4ddb0841911','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924','2024-10-25',0.080000,64.973900,0),('1431d859-ba61-4b9c-a63a-1304e47e6c08','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288','2023-01-03',0.160000,1.000000,0),('16d187cf-c7e6-441b-b25c-7560e757b5f0','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924','2023-11-27',0.080000,50.000000,0),('230872da-e3fb-4fa6-9b68-cf022028f3e4','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','7a664c2c-0324-4ba4-8be4-f1712a7f90be','2024-12-10',0.120000,12.250000,0),('23a00f11-a7d9-4679-933a-79cfaf5a2ad5','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924','2023-12-25',0.080000,50.656800,0),('24e7a85f-2276-493c-af10-2b2a130dd553','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-01-31',0.082500,6.241100,0),('33a57c00-2751-42a8-86e1-5aba7329adc3','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-05-31',0.165000,0.053800,0),('3993a99d-da7c-417d-ba15-706dd68a749f','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2023-10-31',0.082500,6.091900,0),('40299634-756b-45e3-a06e-2bb5ab280b7e','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','6da27f30-10a4-4dec-9ae9-09f0f0d33273','2023-06-27',0.023000,13.000000,0),('425b0943-a7f2-42f5-9e58-b1db301009f4','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288','2022-07-01',0.160000,1.000000,0),('42a46f6b-b728-4d40-b8e7-7c7e475e068f','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288','2022-04-01',0.160000,1.000000,0),('4a81b634-be64-4e14-901c-deca3f6069e5','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-04-30',0.165000,7.051600,0),('69a50cd9-2bd8-4e0e-a2f9-f6cf38cb33f1','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6','2024-07-05',0.150000,2.445600,0),('70c49240-4afa-459b-85f2-b7080e003373','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-07-31',0.165000,0.054000,1),('73964623-eafa-4665-a1a7-ea4da7e4f374','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','7a664c2c-0324-4ba4-8be4-f1712a7f90be','2024-11-12',0.120000,8.171000,0),('8606c4dd-99bd-40f9-843a-e27095f8a6e1','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6','2024-10-24',0.150000,82.031900,0),('8db7bd90-0963-4496-bc78-813bf3b468fa','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','55e7979a-1fd7-4482-ae74-7a84351c6537','2023-09-11',0.145600,5.000000,0),('8f587328-215c-4cf9-84d3-178ef348b963','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288','2021-10-01',0.150000,1.000000,0),('9a8d29bc-c63c-45fa-a0c0-75104a7df4ef','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b','2024-09-30',0.035000,77.748300,0),('a089bff6-c0f5-4b09-a492-6090e0db6206','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-02-29',0.082500,6.289800,0),('a9194224-b93c-46e4-833b-bbd4d85b48c5','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924','2023-01-25',0.080000,51.290600,0),('ae2599ac-28ef-4ebb-bf12-3e22312b4a4d','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288','2022-10-03',0.160000,1.000000,0),('af14810a-81bb-4a1e-b173-3c0062b9b0f1','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2023-11-30',0.082500,6.143300,0),('b2fdd8f5-b426-4f7e-9e9d-76728519a33e','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-07-31',0.165000,0.054600,0),('b9f0fb56-8b11-4458-b99a-15b08ac1ff98','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2023-12-29',0.082500,6.193400,0),('c1236ba7-a15d-401b-b8b6-8c2cd448da97','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','7a664c2c-0324-4ba4-8be4-f1712a7f90be','2024-11-12',0.120000,74.293800,0),('d6e9c15a-e40b-4d4d-92f4-c8d71c4a0cf5','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','7a664c2c-0324-4ba4-8be4-f1712a7f90be','2024-10-09',0.120000,44.003100,0),('da552874-6752-48a0-907f-feec049ff3a7','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6','2024-01-18',0.150000,51.414600,0),('e1a6e16c-ee56-4964-8065-262db1c4c2f6','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-04-02',0.082500,13.988100,0),('e1b78ebf-668a-46e9-87ab-7d015f3bbebe','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-06-28',0.165000,0.054200,0),('ea4c6a69-de3c-4473-8c1a-dc6209c58b43','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924','2024-03-25',0.080000,75.465200,0);
/*!40000 ALTER TABLE `dividends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holdings`
--

DROP TABLE IF EXISTS `holdings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holdings` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `broker_id` varchar(36) NOT NULL,
  `ticker_id` varchar(36) NOT NULL,
  `quantity` int DEFAULT NULL,
  `cost` decimal(14,6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_holdings_to_users` (`user_id`),
  KEY `fk_holdings_to_brokers` (`broker_id`),
  KEY `fk_holdings_to_tickers` (`ticker_id`),
  CONSTRAINT `fk_holdings_to_brokers` FOREIGN KEY (`broker_id`) REFERENCES `brokers` (`id`),
  CONSTRAINT `fk_holdings_to_tickers` FOREIGN KEY (`ticker_id`) REFERENCES `tickers` (`id`),
  CONSTRAINT `fk_holdings_to_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holdings`
--

LOCK TABLES `holdings` WRITE;
/*!40000 ALTER TABLE `holdings` DISABLE KEYS */;
/*!40000 ALTER TABLE `holdings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `name` varchar(32) NOT NULL,
  `value` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_settings_to_users` (`user_id`),
  CONSTRAINT `fk_settings_to_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES ('37f1cd6e-3bac-4456-8051-0781fa02f3da',NULL,'last_updated','12/28/2024 9:49:56 AM'),('73d33de4-be6b-4596-bcc0-2ac29a15b946',NULL,'last_updated','12/28/2024 8:49:42 AM'),('a8b7932c-b537-4752-acd6-3f2e58b2a91b',NULL,'last_updated','12/28/2024 7:37:43 AM'),('dcf344c4-ccc3-40a6-9328-202dd4975e90',NULL,'last_updated','12/25/2024 5:51:31 PM');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `splits`
--

DROP TABLE IF EXISTS `splits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `splits` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `broker_id` varchar(36) NOT NULL,
  `ticker_id` varchar(36) NOT NULL,
  `previous` decimal(6,2) NOT NULL,
  `current` decimal(6,2) NOT NULL,
  `split_date` date NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_splits_to_users` (`user_id`),
  KEY `fk_splits_to_brokers` (`broker_id`),
  KEY `fk_splits_to_tickers` (`ticker_id`),
  CONSTRAINT `fk_splits_to_brokers` FOREIGN KEY (`broker_id`) REFERENCES `brokers` (`id`),
  CONSTRAINT `fk_splits_to_tickers` FOREIGN KEY (`ticker_id`) REFERENCES `tickers` (`id`),
  CONSTRAINT `fk_splits_to_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `splits`
--

LOCK TABLES `splits` WRITE;
/*!40000 ALTER TABLE `splits` DISABLE KEYS */;
INSERT INTO `splits` VALUES ('230244d3-e769-4a61-a0de-e93d6208de00','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',2.00,1.00,'2024-04-04',0),('f1bb2ebf-29f5-4c6c-baf7-7e4aa6168060','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','9c534e96-b549-4bda-a970-a67ad27a5db8',25.00,1.00,'2024-01-11',0);
/*!40000 ALTER TABLE `splits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickers`
--

DROP TABLE IF EXISTS `tickers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickers` (
  `id` varchar(36) NOT NULL,
  `symbol` varchar(8) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `price` decimal(14,6) DEFAULT NULL,
  `volume` int DEFAULT NULL,
  `last_payment_date` date DEFAULT NULL,
  `next_payment_date` date DEFAULT NULL,
  `ex_dividend_date` date DEFAULT NULL,
  `dividend_payout` decimal(14,6) DEFAULT NULL,
  `frequency` int DEFAULT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `symbol` (`symbol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickers`
--

LOCK TABLES `tickers` WRITE;
/*!40000 ALTER TABLE `tickers` DISABLE KEYS */;
INSERT INTO `tickers` VALUES ('0696dddc-a874-4664-94ac-9692bf85c136','CEIN','Camber Energy, Inc.',-1.000000,NULL,NULL,NULL,NULL,NULL,NULL,1,0),('07e1dc3e-948e-11ef-9086-dc454691e924','EARN','Ellington Credit Company',6.650000,459017,'2024-12-26','2025-01-27','2024-12-31',0.080000,1,1,0),('0953e82c-1178-4576-8438-2fdb28e79ea6','BDN','Brandywine Realty Trust',5.510000,947827,'2024-10-24','2025-01-23','2025-01-08',0.150000,3,1,0),('0ea78bec-d7cc-499f-b42b-607d226d8480','EFC','Ellington Financial',12.180000,844266,'2024-12-26','2025-01-27','2024-12-31',0.130000,1,1,0),('153d4589-7168-11ef-b1e8-a4f933c45288','M','Macy\'s',17.540000,5103166,'2024-10-01','2025-01-02','2024-12-13',0.173700,3,1,0),('24c84486-9b88-4ff9-9393-3f6a36a75d8f','PSEC','Prospect Capital',4.260000,3245353,'2024-12-19','2025-01-22','2024-12-27',0.045000,1,1,0),('4676d995-5c5b-4bd9-b1b7-26532e391c42','GLAD','Gladstone Capital',28.120000,108139,'2024-12-18','2024-12-31','2024-12-20',0.165000,1,1,0),('46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b','OXSQ','Oxford Square Capital',2.460000,410884,'2024-11-29','2024-12-31','2024-12-17',0.035000,1,1,0),('55e7979a-1fd7-4482-ae74-7a84351c6537','PCFBY','Pacific Basin Shipping Ltd.',4.730000,146,'2024-09-19','2025-01-19',NULL,0.105000,4,1,0),('6cfb03c3-92e4-44ff-96d6-419310a7d86d','ALLR','Allarity Therapeutics, Inc.',1.370000,210565,NULL,NULL,NULL,NULL,NULL,1,0),('6da27f30-10a4-4dec-9ae9-09f0f0d33273','SQFT','Presidio Property Trust',0.804700,26310,'2023-12-26','2024-02-26',NULL,0.023000,2,1,0),('7a664c2c-0324-4ba4-8be4-f1712a7f90be','AGNC','AGNC Investment Corp.',9.330000,16907419,'2024-12-10','2025-01-10','2024-12-31',0.120000,1,1,0),('8b8006b6-06db-4a6b-85b9-531897931ff3','ALPSQ','Alpine Summit Energy Partners',-1.000000,NULL,NULL,NULL,NULL,NULL,NULL,1,0),('9c534e96-b549-4bda-a970-a67ad27a5db8','EFTR','eFFECTOR Therapeutics',0.000200,2000,NULL,NULL,NULL,NULL,NULL,1,0),('c62d9b2a-4b34-49c0-8ed3-09137c6e3851','JOANQ','Joann Inc.',-1.000000,NULL,NULL,NULL,NULL,NULL,NULL,1,0),('e0234117-1d79-458b-a835-76fbd5f2175c','LGSXY','Light S.A.',0.640000,100,'2023-01-05','2024-06-05',NULL,0.051000,17,1,0),('e90ef920-c094-4dc8-99dd-2478cb232cda','LBUY','Leafbuyer Technologies Inc.',0.030000,29000,NULL,NULL,NULL,NULL,NULL,1,0);
/*!40000 ALTER TABLE `tickers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_types`
--

DROP TABLE IF EXISTS `transaction_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_types` (
  `id` varchar(36) NOT NULL,
  `name` varchar(12) DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_types`
--

LOCK TABLES `transaction_types` WRITE;
/*!40000 ALTER TABLE `transaction_types` DISABLE KEYS */;
INSERT INTO `transaction_types` VALUES ('8d3196f9-715a-11ef-b1e8-a4f933c45288','Sell',2),('ba6fd2cb-7163-11ef-b1e8-a4f933c45288','Lending',5),('D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0','Reinvestment',4),('F5F589B0-71CE-4FEE-AF61-7516F11A90E2','Buy',1);
/*!40000 ALTER TABLE `transaction_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `broker_id` varchar(36) NOT NULL,
  `ticker_id` varchar(36) NOT NULL,
  `price` decimal(14,6) DEFAULT NULL,
  `quantity` decimal(14,6) NOT NULL,
  `transaction_date` datetime NOT NULL,
  `settlement_date` datetime DEFAULT NULL,
  `transaction_type_id` varchar(36) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_transactions_to_users` (`user_id`),
  KEY `FK_transactions_to_tickers` (`ticker_id`),
  KEY `FK_transactions_to_brokers` (`broker_id`),
  KEY `FK_transactions_to_transaction_types` (`transaction_type_id`),
  CONSTRAINT `FK_transactions_to_brokers` FOREIGN KEY (`broker_id`) REFERENCES `brokers` (`id`),
  CONSTRAINT `FK_transactions_to_tickers` FOREIGN KEY (`ticker_id`) REFERENCES `tickers` (`id`),
  CONSTRAINT `FK_transactions_to_transaction_types` FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_types` (`id`),
  CONSTRAINT `FK_transactions_to_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES ('058d0a68-c479-4987-8ce9-07f7558bbd2d','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','8b8006b6-06db-4a6b-85b9-531897931ff3',6.090000,0.656814,'2023-11-27 00:00:00','2024-11-27 00:00:00','d6bc19b8-4bde-4d87-9db3-bac3c41476b0',0),('083344cd-4309-4533-abd4-c76cd7e07852','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','0953e82c-1178-4576-8438-2fdb28e79ea6',5.284800,18.922000,'2024-10-25 00:00:00','2024-10-25 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('0a418f6f-979a-4790-b6f3-f7a7d92b02d2','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',23.920000,0.000418,'2024-07-31 00:00:00','2024-08-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',1),('0acb9f9f-d6de-4f84-a04e-ea0d0c22d333','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',21.270000,7.051627,'2024-04-22 00:00:00','2024-04-23 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('0bd0b4e2-043e-4f78-b97d-343341737daa','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','e0234117-1d79-458b-a835-76fbd5f2175c',0.840000,10.000000,'2023-05-31 00:00:00','2023-05-31 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('14e2354c-d330-45ec-b33d-0464cb445153','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','e0234117-1d79-458b-a835-76fbd5f2175c',0.831000,10.000000,'2023-05-30 00:00:00','2023-05-31 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('15ecf0d1-f4c8-47c3-a2d3-ed81d92db018','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','0ea78bec-d7cc-499f-b42b-607d226d8480',12.104800,7.055000,'2024-12-23 00:00:00','2024-12-23 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('1665693b-2ee2-4e52-947a-abfd1d924148','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0ea78bec-d7cc-499f-b42b-607d226d8480',12.330000,0.209252,'2024-11-25 00:00:00','2024-11-25 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('177fb133-cb97-44b9-b937-ad976858194b','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',9.720000,0.051440,'2023-10-31 00:00:00','2023-11-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('19c62444-6469-445c-8b26-b454c20ec62e','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b',2.680000,1.972283,'2024-11-29 00:00:00','2024-11-29 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('1a7dc85a-4777-457a-818c-9fedcec9bf30','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',10.180000,0.050098,'2023-11-30 00:00:00','2023-12-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('1f36cbc0-d13e-40f4-8997-c1bfb347523a','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','8b8006b6-06db-4a6b-85b9-531897931ff3',0.630000,20.000000,'2023-07-05 00:00:00','2023-07-05 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('1fb97020-86a6-4e64-8dc3-70dc030f619f','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',6.950000,18.000000,'2024-09-11 00:00:00','2024-09-11 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('20f9b0e1-da43-4b51-b8b9-61a44fe73149','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',6.390000,0.633802,'2023-12-26 00:00:00','2024-12-27 00:00:00','d6bc19b8-4bde-4d87-9db3-bac3c41476b0',0),('2110e996-ab78-4d8d-b33b-c49bc6211553','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',4.630000,21.598270,'2024-05-28 00:00:00','2024-05-28 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('226a24fc-e5c2-414f-973e-ef813e776747','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','7a664c2c-0324-4ba4-8be4-f1712a7f90be',10.400000,33.236538,'2024-09-13 00:00:00','2024-09-16 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('244b3955-fd71-4ee4-960c-075871d5950e','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',21.580000,0.053753,'2024-04-30 00:00:00','2024-05-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('29e5d9b1-b66d-48fa-b41d-aada63983c55','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',6.200000,0.661290,'2024-01-25 00:00:00','2024-01-25 00:00:00','d6bc19b8-4bde-4d87-9db3-bac3c41476b0',0),('2da0aa85-7e9b-4601-ade4-d93c9972dcc1','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','6da27f30-10a4-4dec-9ae9-09f0f0d33273',0.923800,13.000000,'2023-06-16 00:00:00','2023-06-16 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('37496fe7-ef57-4a14-8b96-d5937307df2f','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','24c84486-9b88-4ff9-9393-3f6a36a75d8f',4.250000,0.477871,'2024-12-19 00:00:00','2024-12-19 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('3f747f5b-6cdb-4ece-ab8a-b00be2bde6b0','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','e90ef920-c094-4dc8-99dd-2478cb232cda',0.000000,50.000000,'2018-11-13 00:00:00','2018-11-13 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('3fa74dbf-8b4f-4f5b-8972-eed8241511b2','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',5.200000,21.728874,'2024-09-21 00:00:00','2024-09-21 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('40b94e87-911c-4f04-9626-4aafcf98ed22','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','0ea78bec-d7cc-499f-b42b-607d226d8480',12.508900,7.000000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('445614b9-cee4-48c7-b423-dd2a21367371','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',6.540000,16.000000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',1),('44f71a06-25c3-4bd3-9798-5eef897b2948','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288',0.000000,1.000000,'2023-04-03 00:00:00','2023-04-03 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('45074840-d1b4-498d-ac16-2836d27b86ff','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','9c534e96-b549-4bda-a970-a67ad27a5db8',1.810000,0.160000,'2024-04-22 00:00:00','2024-04-23 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('467d3cb6-5d5a-4268-b7a7-1f8df412320d','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','7a664c2c-0324-4ba4-8be4-f1712a7f90be',9.710000,0.151000,'2024-12-10 00:00:00','2024-12-10 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('493d3337-189e-466f-beeb-3d2646a39bbb','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b',2.810000,0.968005,'2024-09-30 00:00:00','2024-10-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('4e8e9c95-a4e1-495d-86ef-12a21842d34e','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',5.200000,0.759234,'2024-10-25 00:00:00','2024-10-28 00:00:00','d6bc19b8-4bde-4d87-9db3-bac3c41476b0',0),('5170319e-5842-459f-a40e-9b7911bcfc7f','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',4.660000,10.706630,'2024-05-31 00:00:00','2024-05-31 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('5cfe1743-4a2f-4519-b0bc-f730c5c39a63','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',28.250000,5.000000,'2024-12-23 00:00:00','2024-12-23 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('5e08ea3f-1a5a-4e26-ab13-9d41edfc7127','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',6.700000,76.344371,'2024-04-22 00:00:00','2024-04-23 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('62987b10-b292-4d08-a01a-41af5e04f58d','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',4.970000,34.750503,'2024-05-15 00:00:00','2024-05-15 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('648f7087-b0a4-4564-aa44-56a44750fda8','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b',2.950000,1.315678,'2024-10-31 00:00:00','2024-11-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('64b529b7-191c-4015-aa43-7f714cff89c4','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','e90ef920-c094-4dc8-99dd-2478cb232cda',0.000000,2000.000000,'2019-07-26 00:00:00','2019-07-26 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('68f0037f-9b57-44b1-9374-7ffed017a034','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',5.000000,1.542000,'2024-01-18 00:00:00','2024-01-19 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('6b8f0432-72d2-451c-b0c9-ad7a4de5fedd','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',5.840000,50.000000,'2023-10-08 00:00:00','2023-10-09 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('717b3034-fb88-48c7-b8b0-681ed5a61734','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','0953e82c-1178-4576-8438-2fdb28e79ea6',5.595200,11.022000,'2024-12-06 00:00:00','2024-12-06 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('7199a6e7-8ee4-4e35-b3d9-dee002c4e600','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','9c534e96-b549-4bda-a970-a67ad27a5db8',0.955000,10.000000,'2023-05-31 00:00:00','2023-05-31 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('721555fc-6480-4523-9a93-fdc8e21d325a','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','9c534e96-b549-4bda-a970-a67ad27a5db8',0.978000,10.000000,'2023-05-31 00:00:00','2023-05-31 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('743a0429-12ef-4389-8b58-2c770bb0a4ec','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','7a664c2c-0324-4ba4-8be4-f1712a7f90be',9.460000,10.000000,'2024-12-23 00:00:00','2024-12-23 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('76995e61-2537-47f1-8277-ab26748c7b88','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b',0.143000,27.400000,'2024-12-18 00:00:00','2024-12-18 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('77fe612a-24e1-43a4-be61-e295fa3bb374','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b',2.910000,77.748292,'2024-09-10 00:00:00','2024-09-10 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('81fcb152-691c-40e6-8631-c386ffd87ba7','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','c62d9b2a-4b34-49c0-8ed3-09137c6e3851',0.955000,12.000000,'2023-06-23 00:00:00','2023-06-23 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('86922edb-6304-4606-a586-b8eb2b29995d','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',6.870000,0.879184,'2024-03-25 00:00:00','2024-03-25 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('889c40c4-f03b-4ba0-9166-e1202c43b644','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',10.200000,7.647058,'2024-02-18 00:00:00','2024-02-20 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('8b089856-7d2c-4edc-a9e5-616c6e9cfca1','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',5.180000,23.925172,'2024-09-12 00:00:00','2024-09-12 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('8b40c006-5e8b-4d39-901b-22339fef38db','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','9c534e96-b549-4bda-a970-a67ad27a5db8',0.990000,4.000000,'2023-06-15 00:00:00','2023-06-15 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('8b5c795a-9dde-419e-b6fe-40eafd60d8d6','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','7a664c2c-0324-4ba4-8be4-f1712a7f90be',9.996100,8.171000,'2024-10-25 00:00:00','2024-10-25 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('8d2ace98-61b4-4c99-af58-f0352ee35801','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',6.750000,23.110986,'2024-10-13 00:00:00','2024-10-13 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('8fe8de1e-fcf4-4fdb-8259-46dbf0bfe7e0','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','7a664c2c-0324-4ba4-8be4-f1712a7f90be',9.570000,0.932137,'2024-11-13 00:00:00','2024-11-13 00:00:00','d6bc19b8-4bde-4d87-9db3-bac3c41476b0',0),('908ad35d-7055-403e-a152-345e0169ef2e','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','7a664c2c-0324-4ba4-8be4-f1712a7f90be',9.750000,0.104000,'2024-11-12 00:00:00','2024-11-12 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',1),('9561095f-fd9d-4d37-b203-543c5c4dc226','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',6.700000,5.974755,'2024-10-08 00:00:00','2024-10-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('989fc404-f271-4294-a3d2-e0f12bc69e56','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','0ea78bec-d7cc-499f-b42b-607d226d8480',12.466300,3.275000,'2024-11-22 00:00:00','2024-11-22 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('9973b563-d341-4933-94e2-6e6e7eae5475','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',5.430000,9.125230,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('9a51eee4-62cd-41a4-af2d-0d04543fa0dd','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288',14.350000,1.000000,'2023-05-30 00:00:00','2023-05-30 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('9d1967f9-e599-4eb0-9013-0fe13a8a6010','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','c62d9b2a-4b34-49c0-8ed3-09137c6e3851',1.000000,12.000000,'2023-06-23 00:00:00','2023-06-23 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('9df68bcd-d3f8-422d-87a8-38beb1e715c3','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','24c84486-9b88-4ff9-9393-3f6a36a75d8f',4.220000,10.000000,'2024-12-21 00:00:00','2024-12-21 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('a01356aa-f708-447f-863b-5aeeb8ad35f5','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',10.700000,0.047663,'2023-12-29 00:00:00','2024-01-02 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('a039b6c3-ac73-45c1-8943-6dc61b9c71ab','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','7a664c2c-0324-4ba4-8be4-f1712a7f90be',9.746600,4.104000,'2024-11-22 00:00:00','2024-11-22 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('a0b36b09-5da1-4967-9b65-e10fbe5ce4e7','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','24c84486-9b88-4ff9-9393-3f6a36a75d8f',4.520000,11.061000,'2024-12-06 00:00:00','2024-12-06 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('a2bb3d1e-b19e-4b4e-af4a-87b7890b9076','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','24c84486-9b88-4ff9-9393-3f6a36a75d8f',4.655000,21.482000,'2024-11-22 00:00:00','2024-11-22 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('a2f415e4-35ce-425a-bd56-89883dabd3db','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0696dddc-a874-4664-94ac-9692bf85c136',1.060000,10.000000,'2023-05-30 00:00:00','2023-05-30 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('a5e84fc2-1b62-4aab-a243-016d9da0e161','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','6da27f30-10a4-4dec-9ae9-09f0f0d33273',0.970000,13.000000,'2023-06-23 00:00:00','2023-07-03 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('a93dd948-6077-4e76-a792-635679d0bb3e','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',5.960000,22.818791,'2024-02-18 00:00:00','2024-02-18 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('aa90cf3e-8414-4129-a7e1-d112ce47af71','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','6cfb03c3-92e4-44ff-96d6-419310a7d86d',0.263600,50.000000,'2023-06-01 00:00:00','2023-04-03 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('b06d84f7-b225-45ee-99d5-a19c8df49608','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',9.990000,0.115115,'2024-04-02 00:00:00','2024-04-03 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('b08a77f3-243d-4593-9ba5-40dba5e14c90','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',7.020000,14.245650,'2024-09-21 00:00:00','2024-09-21 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('b4029f0f-5714-4c65-8928-e445b04dd20a','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','07e1dc3e-948e-11ef-9086-dc454691e924',6.445500,14.000000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('b4a99ab6-e01a-469d-abb2-daf230088983','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','55e7979a-1fd7-4482-ae74-7a84351c6537',5.870000,5.000000,'2023-08-04 00:00:00','2023-08-04 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('b60fc0ae-2710-4733-ad25-3821d6df4831','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',9.330000,6.091891,'2023-10-08 00:00:00','2023-10-09 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('b6194d13-52f6-4ca9-ab2a-6f54cd4e2cb1','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',10.460000,0.048757,'2024-01-31 00:00:00','2024-02-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('b7cd3ac6-fcf4-426f-80cf-208b23c743bb','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',6.710000,1.131600,'2024-11-25 00:00:00','2024-11-25 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('bd9f982c-f90c-45a0-892e-5a2e3bd9c105','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',4.440000,88.413902,'2024-04-22 00:00:00','2024-04-23 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('be154ce6-b9ab-488d-92b1-2848ef2347ff','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',5.010000,33.932237,'2024-08-15 00:00:00','2024-08-15 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('c11a21eb-7df1-4f88-9bdb-829706aeb5e8','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',23.360000,0.000428,'2024-06-28 00:00:00','2024-07-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('c202f49c-709f-41a3-99de-b0acd1bcb381','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','7a664c2c-0324-4ba4-8be4-f1712a7f90be',10.520000,10.766520,'2024-09-21 00:00:00','2024-09-23 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('c309a112-abca-4a4f-ab19-82c4a1e23b6a','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',5.330000,2.309859,'2024-10-25 00:00:00','2024-11-25 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('c43856cb-7028-42fe-a325-5c5e1ea626a3','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',6.930000,32.728206,'2024-09-10 00:00:00','2024-09-10 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('c8f62123-9b58-460b-a7cb-66ccbf62407f','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',10.150000,0.051231,'2024-02-29 00:00:00','2024-03-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('c9d3b038-ec8d-41f4-a6fd-d5837f8ddcc1','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',5.570000,17.953321,'2024-11-22 00:00:00','2024-11-22 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('cdd75ef2-473f-4286-bacf-59ba0a02a90c','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b',2.900000,38.616291,'2024-10-23 00:00:00','2024-10-23 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('cea4842c-e9d8-47d2-83e1-55aba97c6984','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',4.150000,32.530353,'2024-02-18 00:00:00','2024-02-20 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('cf66ca2b-2d87-443f-b888-0c96311d471a','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','24c84486-9b88-4ff9-9393-3f6a36a75d8f',4.050000,0.240000,'2024-12-23 00:00:00','2024-12-23 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('cff8f42b-783a-418b-aca3-23350e9c50ea','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',23.430000,0.055480,'2024-09-16 00:00:00','2024-09-17 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('d1281ad0-4b33-4575-b495-85681721e868','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',3.890000,51.414609,'2023-10-08 00:00:00','2023-10-09 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('d2aac8a3-a526-46b1-9a73-7bec52514a53','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',28.270000,4.000000,'2024-12-06 00:00:00','2024-12-06 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('d329b571-2dee-443e-bc49-d71bad40c9b8','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','0ea78bec-d7cc-499f-b42b-607d226d8480',12.509100,0.994000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('d5c6f6c4-7071-4a04-b16d-0de66016967c','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',23.920000,0.000418,'2024-07-31 00:00:00','2024-08-01 00:00:00','d6bc19b8-4bde-4d87-9db3-bac3c41476b0',1),('d62600d8-c4f7-4659-96a5-54a66c8a4463','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','24c84486-9b88-4ff9-9393-3f6a36a75d8f',4.530000,22.000000,'2024-12-06 00:00:00','2024-12-06 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('dadd0538-7223-481e-8a19-91141c323316','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',5.990000,0.694490,'2024-02-26 00:00:00','2024-02-26 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('db441c24-653d-43c5-bce6-c4e34060d994','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',6.660000,7.572070,'2024-11-22 00:00:00','2024-11-22 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('decdb02d-6bc7-47e2-84f6-78a005aaeb78','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b',2.800000,32.142754,'2024-09-21 00:00:00','2024-09-23 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('e158cb06-c7ec-4b62-9ecb-45b8fabad844','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0696dddc-a874-4664-94ac-9692bf85c136',1.050000,10.000000,'2023-06-01 00:00:00','2023-06-01 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('e38ed803-7d48-4a6e-b696-f6fabcd0e0c5','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','24c84486-9b88-4ff9-9393-3f6a36a75d8f',4.650000,45.000000,'2024-11-22 00:00:00','2024-11-22 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('e57fcd99-6de0-442d-ae5a-0fe4b924f760','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',22.470000,0.000445,'2024-05-31 00:00:00','2024-06-03 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('e86bbeeb-6f2f-4f80-858b-537876e675ab','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0ea78bec-d7cc-499f-b42b-607d226d8480',12.430000,6.000000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('eb85288c-36d3-44a1-bcd5-529f4c8be8ec','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','55e7979a-1fd7-4482-ae74-7a84351c6537',6.850000,5.000000,'2024-04-22 00:00:00','2024-04-23 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('ebe011ee-a4b1-4bb0-8d71-a5f2d4209b49','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','07e1dc3e-948e-11ef-9086-dc454691e924',6.450000,0.053000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('ec10a321-b9b6-47fc-9bb9-49bdc275f7a3','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0ea78bec-d7cc-499f-b42b-607d226d8480',12.220000,12.000000,'2024-12-06 00:00:00','2024-12-06 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('ec12a67e-b5e8-4d26-a498-3b9f3f4e6719','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','07e1dc3e-948e-11ef-9086-dc454691e924',6.820000,10.000000,'2024-12-06 00:00:00','2024-12-06 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('ef55663a-d833-4e68-9ba8-463102e8a405','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b',0.735800,2.650000,'2024-12-06 00:00:00','2024-12-06 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('f0058b1c-78dc-4337-a297-22b360484adb','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','7a664c2c-0324-4ba4-8be4-f1712a7f90be',9.530000,16.000000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('f085f6b3-e4a8-4c9f-b418-951a1d8d77db','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',6.540000,16.000000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('f0fdbcf9-594a-4808-b79d-1fbef327be09','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','7a664c2c-0324-4ba4-8be4-f1712a7f90be',10.410000,29.779058,'2024-09-29 00:00:00','2024-09-30 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('f8cdae52-1051-4eae-bb8b-9013abcae3d5','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',4.380000,2.926940,'2024-04-18 00:00:00','2024-04-19 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('f9fb57f1-dce1-41ad-b62c-f90ceee77b5a','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',22.940000,0.000436,'2024-08-30 00:00:00','2024-09-03 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('fb6e9909-36a2-4821-9de2-73e0c2bf5337','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',25.530000,9.792554,'2024-11-12 00:00:00','2024-11-12 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('fc15a78a-6f3b-4dc2-9154-a30bea91a89d','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',23.920000,0.000418,'2024-07-31 00:00:00','2024-08-01 00:00:00','d6bc19b8-4bde-4d87-9db3-bac3c41476b0',0),('fcb57181-38a1-4fda-b83f-6a79b2b158ba','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0ea78bec-d7cc-499f-b42b-607d226d8480',12.210000,10.000000,'2024-12-22 00:00:00','2024-12-22 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('fd4f1437-6b9d-4fbd-8f8b-ff94a551af3c','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0ea78bec-d7cc-499f-b42b-607d226d8480',12.600000,19.841662,'2024-10-23 00:00:00','2024-10-23 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('ff0bb8b6-f6aa-4040-8cf5-369013a9b313','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','6cfb03c3-92e4-44ff-96d6-419310a7d86d',0.262200,50.000000,'2023-05-30 00:00:00','2023-05-30 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('ffbee42d-cd4c-4da6-b119-391117811ee9','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','7a664c2c-0324-4ba4-8be4-f1712a7f90be',10.320000,0.511637,'2024-10-09 00:00:00','2024-10-10 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_brokers`
--

DROP TABLE IF EXISTS `user_brokers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_brokers` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `broker_id` varchar(36) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_user_brokers_to_users` (`user_id`),
  KEY `fk_user_brokers_to_brokers` (`broker_id`),
  CONSTRAINT `fk_user_brokers_to_brokers` FOREIGN KEY (`broker_id`) REFERENCES `brokers` (`id`),
  CONSTRAINT `fk_user_brokers_to_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_brokers`
--

LOCK TABLES `user_brokers` WRITE;
/*!40000 ALTER TABLE `user_brokers` DISABLE KEYS */;
INSERT INTO `user_brokers` VALUES ('07711757-39a5-4bc8-89e9-97093a8e99e3','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e',0),('164a5c02-c37a-44df-b05f-cca8a0ad268b','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e',0),('45beff9f-fe71-45be-9681-65c9cfc35b7f','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e',0),('a1766c69-30f7-493d-8f57-6cf144a2f1b0','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e',0),('a9094a2a-2757-4ad4-a1e8-d4b50bc4a8a4','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e',0),('abc54924-0337-4683-8505-479453decd9e','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e',0),('cf103418-9c73-4a84-bcfc-11af15b67c4b','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e',0),('f4fc5aea-a559-4ab6-8373-095307b41741','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7',0);
/*!40000 ALTER TABLE `user_brokers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_stocks`
--

DROP TABLE IF EXISTS `user_stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_stocks` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `broker_id` varchar(36) NOT NULL,
  `ticker_id` varchar(36) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_user_stocks_to_users` (`user_id`),
  KEY `fk_user_stocks_to_brokers` (`broker_id`),
  KEY `fk_user_stocks_to_tickers` (`ticker_id`),
  CONSTRAINT `fk_user_stocks_to_brokers` FOREIGN KEY (`broker_id`) REFERENCES `brokers` (`id`),
  CONSTRAINT `fk_user_stocks_to_tickers` FOREIGN KEY (`ticker_id`) REFERENCES `tickers` (`id`),
  CONSTRAINT `fk_user_stocks_to_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_stocks`
--

LOCK TABLES `user_stocks` WRITE;
/*!40000 ALTER TABLE `user_stocks` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tickers`
--

DROP TABLE IF EXISTS `user_tickers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tickers` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `ticker_id` varchar(36) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_user_tickers_to_users` (`user_id`),
  KEY `fk_user_tickers_to_tickers` (`ticker_id`),
  CONSTRAINT `fk_user_tickers_to_tickers` FOREIGN KEY (`ticker_id`) REFERENCES `tickers` (`id`),
  CONSTRAINT `fk_user_tickers_to_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tickers`
--

LOCK TABLES `user_tickers` WRITE;
/*!40000 ALTER TABLE `user_tickers` DISABLE KEYS */;
INSERT INTO `user_tickers` VALUES ('2ee67d76-b002-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','07e1dc3e-948e-11ef-9086-dc454691e924',0),('2ee6a403-b002-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','0953e82c-1178-4576-8438-2fdb28e79ea6',0),('2ee6a524-b002-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','0ea78bec-d7cc-499f-b42b-607d226d8480',0),('2ee6a5ce-b002-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','153d4589-7168-11ef-b1e8-a4f933c45288',0),('2ee6a64c-b002-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','24c84486-9b88-4ff9-9393-3f6a36a75d8f',0),('2ee6a6cf-b002-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','4676d995-5c5b-4bd9-b1b7-26532e391c42',0),('2ee6a73e-b002-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b',0),('2ee6a7b3-b002-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','55e7979a-1fd7-4482-ae74-7a84351c6537',0),('2ee6a827-b002-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','6cfb03c3-92e4-44ff-96d6-419310a7d86d',0),('2ee6a8ea-b002-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','6da27f30-10a4-4dec-9ae9-09f0f0d33273',0),('2ee6aa91-b002-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','7a664c2c-0324-4ba4-8be4-f1712a7f90be',0),('2ee6ab35-b002-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','9c534e96-b549-4bda-a970-a67ad27a5db8',0),('2ee6aba8-b002-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','e0234117-1d79-458b-a835-76fbd5f2175c',0),('2ee6ac12-b002-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','e90ef920-c094-4dc8-99dd-2478cb232cda',0);
/*!40000 ALTER TABLE `user_tickers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `email_address` varchar(32) NOT NULL,
  `password` varchar(128) NOT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `administrator` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('071e5e85-aa78-11ef-9b55-dc454691e924','rex@rogerlmain.com','8aca4f36774f82a67c507cb9c96679482e2cc767f2d38502269557a566b092fb','Rex','Strange',1),('a6317141-c3cf-41cb-bae3-17545a067958','roger.main@rexthestrange.com','8aca4f36774f82a67c507cb9c96679482e2cc767f2d38502269557a566b092fb','Roger','Main',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'stockboy'
--
/*!50003 DROP PROCEDURE IF EXISTS `get_dividends` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_dividends`(broker_id varchar (36), ticker_id varchar (36))
begin

	select
		dvd.id,
        dvd.broker_id,
        dvd.ticker_id,
        brk.name as broker,
        tck.name as company,
        tck.symbol as ticker,
        dvd.issue_date,
        dvd.amount_per_share,
        dvd.share_quantity,
        round(dvd.amount_per_share * dvd.share_quantity, 2) as payout
	from
		dividends as dvd
	join
		brokers as brk
	on
		brk.id = dvd.broker_id
	join
		tickers as tck
	on
		tck.id = dvd.ticker_id
	where
		((dvd.broker_id = broker_id) or (broker_id is null)) and
        ((dvd.ticker_id = ticker_id) or (ticker_id is null));

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_dividend_by_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_dividend_by_id`(id varchar (36))
begin

	select
		dvd.id,
        brk.name as broker,
        tck.name as ticker,
        dvd.broker_id,
        dvd.ticker_id,
        dvd.issue_date,
        dvd.amount_per_share,
        dvd.share_quantity,
        dvd.amount_per_share * dvd.share_quantity as payout
	from
		dividends as dvd
	join
		brokers as brk
	on
		brk.id = dvd.broker_id
	join
		tickers as tck
	on
		tck.id = dvd.ticker_id
	where
		(dvd.id = id);

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_splits` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_splits`(broker_id varchar (36), ticker_id varchar (36))
begin

	select
		spl.id,
        brk.id as broker_id,
        tck.id as ticker_id,
        tck.name as company,
		brk.name as broker,
        tck.symbol as ticker,
		previous,
        current,
        split_date
	from
		splits as spl
	join
		brokers as brk
	on
		(brk.id = spl.broker_id)
	join
		tickers as tck
	on
		tck.id = spl.ticker_id
	where
		((brk.id = broker_id) or (broker_id is null)) and
        ((tck.id = ticker_id) or (ticker_id is null));
        
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_split_by_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_split_by_id`(id varchar (36))
begin

	select
		spl.id,
        brk.id as broker_id,
        tck.id as ticker_id,
		brk.name as broker,
        tck.name as company,
        tck.symbol,
		previous,
        current,
        split_date
	from
		splits as spl
	join
		brokers as brk
	on
		(brk.id = spl.broker_id)
	join
		tickers as tck
	on
		tck.id = spl.ticker_id
	where
		(spl.id = id);
        
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_tickers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_tickers`(broker_id varchar (36))
begin

	select distinct
		tck.id,
        tck.name,
        tck.symbol
	from
		tickers as tck
	where
		(tck.broker_id = broker_id)
	order by
		tck.name;
        
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_transactions` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_transactions`(broker_id varchar (36), ticker_id varchar (36))
begin

	select
		tac.id,
        brk.id as broker_id,
        tck.id as ticker_id,
        tck.name as company,
		brk.name as broker,
        tck.symbol as ticker,
        tac.price,
		tac.quantity,
        tac.price * tac.quantity as cost,
		tac.transaction_date,
		tac.settlement_date,
		ttp.name as transaction_type,
        ttp.id as transaction_type_id
	from 
		transactions as tac
	join
		tickers as tck
	on
		tck.id = tac.ticker_id
	join
		brokers as brk
	on
		brk.id = tac.broker_id
	join
		transaction_types as ttp
	on
		ttp.id = transaction_type_id
	where
		((brk.id = broker_id) or (broker_id is null)) and
		((tck.id = ticker_id) or (ticker_id is null)) and
        (not tac.deleted);

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_transaction_by_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_transaction_by_id`(id varchar (36))
begin

	select
		tac.id,
        brk.id as broker_id,
        tck.id as ticker_id,
        tck.name as company,
        tck.symbol as ticker,
		brk.name as broker,
        tac.price,
		tac.quantity,
        tac.price * tac.quantity as cost,
		tac.transaction_date,
		tac.settlement_date,
		ttp.name as transaction_type
	from 
		transactions as tac
	join
		tickers as tck
	on
		tck.id = tac.ticker_id
	join
		brokers as brk
	on
		brk.id = tac.broker_id
	join
		transaction_types as ttp
	on
		ttp.id = transaction_type_id
	where
		(tac.id = id) and
        (not tac.deleted);

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `select_transactions` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_transactions`()
begin

	select 
		brk.name as broker,
		tck.name as ticker,
		trn.price,
		trn.quantity,
		trn.transaction_date,
		trn.settlement_date,
		ttp.name as transaction_type,
		trn.deleted
	from
		transactions as trn
	join
		brokers as brk
	on
		brk.id = trn.broker_id
	join
		tickers as tck
	on
		tck.id = trn.ticker_id
	join
		transaction_types as ttp
	on
		ttp.id = trn.transaction_type_id
	order by
		brk.name,
		tck.name,
		trn.transaction_date;
        
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `activity_view`
--

/*!50001 DROP VIEW IF EXISTS `activity_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `activity_view` AS select `tac`.`id` AS `id`,`tac`.`user_id` AS `user_id`,`brk`.`id` AS `broker_id`,`tck`.`id` AS `ticker_id`,`brk`.`name` AS `broker`,`tck`.`symbol` AS `symbol`,concat(`tck`.`name`,if((`tck`.`price` = -(1)),' (Defunct)','')) AS `company`,`tac`.`price` AS `cost_price`,`tck`.`price` AS `current_price`,`tac`.`quantity` AS `quantity`,`ttp`.`name` AS `transaction_type`,`tac`.`transaction_date` AS `transaction_date` from (((`transactions` `tac` join `brokers` `brk` on((`brk`.`id` = `tac`.`broker_id`))) join `tickers` `tck` on((`tck`.`id` = `tac`.`ticker_id`))) join `transaction_types` `ttp` on((`ttp`.`id` = `tac`.`transaction_type_id`))) where (0 = `tac`.`deleted`) union select `spl`.`id` AS `id`,`spl`.`user_id` AS `user_id`,`brk`.`id` AS `broker_id`,`tck`.`id` AS `ticker_id`,`brk`.`name` AS `broker`,`tck`.`symbol` AS `symbol`,`tck`.`name` AS `name`,0 AS `cost_price`,`tck`.`price` AS `current_price`,(`spl`.`current` / `spl`.`previous`) AS `quantity`,'Split' AS `transaction_type`,`spl`.`split_date` AS `transaction_date` from ((`splits` `spl` join `brokers` `brk` on((`brk`.`id` = `spl`.`broker_id`))) join `tickers` `tck` on((`tck`.`id` = `spl`.`ticker_id`))) where (0 = `spl`.`deleted`) order by `broker`,`company`,`transaction_date`,field(`transaction_type`,'Buy','Split','Sell') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-28 10:45:07
