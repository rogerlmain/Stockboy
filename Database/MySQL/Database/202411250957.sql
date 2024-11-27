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
INSERT INTO `brokers` VALUES ('80e43ec8-016a-453d-b4ff-80d9d79a2bc7','Robinhood',0),('87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','Fidelity',0);
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
  `broker_id` varchar(36) NOT NULL,
  `ticker_id` varchar(36) NOT NULL,
  `issue_date` date NOT NULL,
  `amount_per_share` decimal(14,6) NOT NULL,
  `share_quantity` decimal(14,6) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_dividends_to_brokers` (`broker_id`),
  KEY `FK_dividends_to_tickers` (`ticker_id`),
  CONSTRAINT `FK_dividends_to_brokers` FOREIGN KEY (`broker_id`) REFERENCES `brokers` (`id`),
  CONSTRAINT `FK_dividends_to_tickers` FOREIGN KEY (`ticker_id`) REFERENCES `tickers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dividends`
--

LOCK TABLES `dividends` WRITE;
/*!40000 ALTER TABLE `dividends` DISABLE KEYS */;
INSERT INTO `dividends` VALUES ('020be455-8082-40f9-a12a-af371fc57870','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288','2022-01-03',0.150000,1.000000,0),('02fad41e-56b6-4acd-8d9a-d74599a79253','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-08-30',0.165000,0.055000,0),('0c9e0a07-0c07-41e1-8163-c74de47b04b2','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924','2024-02-26',0.080000,51.951900,0),('10096a94-4bc1-4450-a108-72e9d5575877','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288','2023-04-03',0.160000,1.000000,0),('10c794b8-3351-4664-8d9f-a57c9f8e1f86','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924','2024-04-25',0.080000,76.344400,0),('10c8fb2e-d488-4be2-a853-83bbbd4b9141','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6','2024-04-18',0.150000,85.487000,0),('10d9b974-6b52-412f-8f15-e4ddb0841911','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924','2024-10-25',0.080000,64.973900,0),('1431d859-ba61-4b9c-a63a-1304e47e6c08','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288','2023-01-03',0.160000,1.000000,0),('16d187cf-c7e6-441b-b25c-7560e757b5f0','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924','2023-11-27',0.080000,50.000000,0),('23a00f11-a7d9-4679-933a-79cfaf5a2ad5','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924','2023-12-25',0.080000,50.656800,0),('24e7a85f-2276-493c-af10-2b2a130dd553','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-01-31',0.082500,6.241100,0),('33a57c00-2751-42a8-86e1-5aba7329adc3','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-05-31',0.165000,0.053800,0),('3993a99d-da7c-417d-ba15-706dd68a749f','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2023-10-31',0.082500,6.091900,0),('40299634-756b-45e3-a06e-2bb5ab280b7e','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','6da27f30-10a4-4dec-9ae9-09f0f0d33273','2023-06-27',0.023000,13.000000,0),('425b0943-a7f2-42f5-9e58-b1db301009f4','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288','2022-07-01',0.160000,1.000000,0),('42a46f6b-b728-4d40-b8e7-7c7e475e068f','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288','2022-04-01',0.160000,1.000000,0),('4823a828-9a78-4897-9973-8542760ded00','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b','2024-10-31',0.035000,110.859100,0),('4a81b634-be64-4e14-901c-deca3f6069e5','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-04-30',0.165000,7.051600,0),('69a50cd9-2bd8-4e0e-a2f9-f6cf38cb33f1','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6','2024-07-05',0.150000,2.445600,0),('70c49240-4afa-459b-85f2-b7080e003373','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-07-31',0.165000,0.054000,1),('73964623-eafa-4665-a1a7-ea4da7e4f374','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','7a664c2c-0324-4ba4-8be4-f1712a7f90be','2024-11-12',0.120000,8.171000,0),('8606c4dd-99bd-40f9-843a-e27095f8a6e1','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6','2024-10-24',0.150000,82.031900,0),('8db7bd90-0963-4496-bc78-813bf3b468fa','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','55e7979a-1fd7-4482-ae74-7a84351c6537','2023-09-11',0.145600,5.000000,0),('8f587328-215c-4cf9-84d3-178ef348b963','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288','2021-10-01',0.150000,1.000000,0),('9a8d29bc-c63c-45fa-a0c0-75104a7df4ef','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b','2024-09-30',0.035000,77.748300,0),('a089bff6-c0f5-4b09-a492-6090e0db6206','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-02-29',0.082500,6.289800,0),('a9194224-b93c-46e4-833b-bbd4d85b48c5','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924','2023-01-25',0.080000,51.290600,0),('ae2599ac-28ef-4ebb-bf12-3e22312b4a4d','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288','2022-10-03',0.160000,1.000000,0),('af14810a-81bb-4a1e-b173-3c0062b9b0f1','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2023-11-30',0.082500,6.143300,0),('b2fdd8f5-b426-4f7e-9e9d-76728519a33e','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-07-31',0.165000,0.054600,0),('b9f0fb56-8b11-4458-b99a-15b08ac1ff98','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2023-12-29',0.082500,6.193400,0),('c1236ba7-a15d-401b-b8b6-8c2cd448da97','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','7a664c2c-0324-4ba4-8be4-f1712a7f90be','2024-11-12',0.120000,74.293800,0),('d6e9c15a-e40b-4d4d-92f4-c8d71c4a0cf5','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','7a664c2c-0324-4ba4-8be4-f1712a7f90be','2024-10-09',0.120000,44.003100,0),('da552874-6752-48a0-907f-feec049ff3a7','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6','2024-01-18',0.150000,51.414600,0),('e1a6e16c-ee56-4964-8065-262db1c4c2f6','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-04-02',0.082500,13.988100,0),('e1b78ebf-668a-46e9-87ab-7d015f3bbebe','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42','2024-06-28',0.165000,0.054200,0),('ea4c6a69-de3c-4473-8c1a-dc6209c58b43','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924','2024-03-25',0.080000,75.465200,0);
/*!40000 ALTER TABLE `dividends` ENABLE KEYS */;
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
INSERT INTO `settings` VALUES ('dcf344c4-ccc3-40a6-9328-202dd4975e90',NULL,'last_updated','11/25/2024 9:55:00 AM');
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
  `user_stocks_id` varchar(36) DEFAULT NULL,
  `previous` decimal(6,2) NOT NULL,
  `current` decimal(6,2) NOT NULL,
  `split_date` date NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_splits_to_user_stocks` (`user_stocks_id`),
  CONSTRAINT `fk_splits_to_user_stocks` FOREIGN KEY (`user_stocks_id`) REFERENCES `user_stocks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `splits`
--

LOCK TABLES `splits` WRITE;
/*!40000 ALTER TABLE `splits` DISABLE KEYS */;
INSERT INTO `splits` VALUES ('230244d3-e769-4a61-a0de-e93d6208de00','f68c9313-ab44-11ef-9b55-dc454691e924',2.00,1.00,'2024-04-04',0),('f1bb2ebf-29f5-4c6c-baf7-7e4aa6168060','f68c993f-ab44-11ef-9b55-dc454691e924',25.00,1.00,'2024-01-11',0);
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
INSERT INTO `tickers` VALUES ('0696dddc-a874-4664-94ac-9692bf85c136','CEIN','Camber Energy, Inc.',-1.000000,NULL,NULL,NULL,NULL,NULL,NULL,0),('07e1dc3e-948e-11ef-9086-dc454691e924','EARN','Ellington Credit Company',6.760000,218091,'2024-11-25','2024-12-26','2024-11-29',0.080000,1,0),('0953e82c-1178-4576-8438-2fdb28e79ea6','BDN','Brandywine Realty Trust',5.775000,1576554,'2024-10-24','2025-01-24',NULL,0.150000,3,0),('0ea78bec-d7cc-499f-b42b-607d226d8480','EFC','Ellington Financial',12.515900,502052,'2024-11-25','2024-12-26','2024-11-29',0.130000,1,0),('153d4589-7168-11ef-b1e8-a4f933c45288','M','Macy\'s',15.775000,7896396,'2024-10-01','2025-01-02','2024-12-13',0.173700,3,0),('24c84486-9b88-4ff9-9393-3f6a36a75d8f','PSEC','Prospect Capital',4.802000,1571113,'2024-11-19','2024-12-19','2024-11-26',0.045000,1,0),('4676d995-5c5b-4bd9-b1b7-26532e391c42','GLAD','Gladstone Capital',27.103700,41695,'2024-10-31','2024-11-29','2024-11-20',0.165000,1,0),('46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b','OXSQ','Oxford Square Capital',2.675000,217312,'2024-10-31','2024-11-29','2024-11-15',0.035000,1,0),('55e7979a-1fd7-4482-ae74-7a84351c6537','PCFBY','Pacific Basin Shipping Ltd.',5.690000,973,'2024-09-19','2025-01-19',NULL,0.105000,4,0),('6cfb03c3-92e4-44ff-96d6-419310a7d86d','ALLR','Allarity Therapeutics, Inc.',1.370000,210565,NULL,NULL,NULL,NULL,NULL,0),('6da27f30-10a4-4dec-9ae9-09f0f0d33273','SQFT','Presidio Property Trust',0.633100,51596,'2023-12-26','2024-02-26',NULL,0.023000,2,0),('7a664c2c-0324-4ba4-8be4-f1712a7f90be','AGNC','AGNC Investment Corp.',9.805000,7766833,'2024-11-12','2024-12-10','2024-11-29',0.120000,1,0),('8b8006b6-06db-4a6b-85b9-531897931ff3','ALPSQ','Alpine Summit Energy Partners',-1.000000,NULL,NULL,NULL,NULL,NULL,NULL,0),('9c534e96-b549-4bda-a970-a67ad27a5db8','EFTR','eFFECTOR Therapeutics',0.000200,2000,NULL,NULL,NULL,NULL,NULL,0),('c62d9b2a-4b34-49c0-8ed3-09137c6e3851','JOANQ','Joann Inc.',-1.000000,NULL,NULL,NULL,NULL,NULL,NULL,0),('e0234117-1d79-458b-a835-76fbd5f2175c','LGSXY','Light S.A.',0.800000,1,'2023-01-05','2024-06-05',NULL,0.051000,17,0),('e90ef920-c094-4dc8-99dd-2478cb232cda','LBUY','Leafbuyer Technologies Inc.',0.030000,29000,NULL,NULL,NULL,NULL,NULL,0);
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
  `user_stocks_id` varchar(36) DEFAULT NULL,
  `price` decimal(14,6) DEFAULT NULL,
  `quantity` decimal(14,6) NOT NULL,
  `transaction_date` datetime NOT NULL,
  `settlement_date` datetime DEFAULT NULL,
  `transaction_type_id` varchar(36) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_transactions_to_transaction_types` (`transaction_type_id`),
  KEY `fk_transactions_to_user_stocks` (`user_stocks_id`),
  CONSTRAINT `FK_transactions_to_transaction_types` FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_types` (`id`),
  CONSTRAINT `fk_transactions_to_user_stocks` FOREIGN KEY (`user_stocks_id`) REFERENCES `user_stocks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES ('058d0a68-c479-4987-8ce9-07f7558bbd2d','f68c8cff-ab44-11ef-9b55-dc454691e924',6.090000,0.656814,'2023-11-27 00:00:00','2024-11-07 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('083344cd-4309-4533-abd4-c76cd7e07852','f68c9209-ab44-11ef-9b55-dc454691e924',5.284800,18.922000,'2024-10-25 00:00:00','2024-10-25 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('0a418f6f-979a-4790-b6f3-f7a7d92b02d2','f68c9313-ab44-11ef-9b55-dc454691e924',23.920000,0.000418,'2024-07-31 00:00:00','2024-08-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',1),('0acb9f9f-d6de-4f84-a04e-ea0d0c22d333','f68c9313-ab44-11ef-9b55-dc454691e924',21.270000,7.051627,'2024-04-22 00:00:00','2024-04-23 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('0bd0b4e2-043e-4f78-b97d-343341737daa','f68c93b5-ab44-11ef-9b55-dc454691e924',0.840000,10.000000,'2023-05-31 00:00:00','2023-05-31 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('14e2354c-d330-45ec-b33d-0464cb445153','f68c93b5-ab44-11ef-9b55-dc454691e924',0.831000,10.000000,'2023-05-30 00:00:00','2023-05-31 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('177fb133-cb97-44b9-b937-ad976858194b','f68c9313-ab44-11ef-9b55-dc454691e924',9.720000,0.051440,'2023-10-31 00:00:00','2023-11-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('1a7dc85a-4777-457a-818c-9fedcec9bf30','f68c9313-ab44-11ef-9b55-dc454691e924',10.180000,0.050098,'2023-11-30 00:00:00','2023-12-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('1f36cbc0-d13e-40f4-8997-c1bfb347523a','f68c945a-ab44-11ef-9b55-dc454691e924',0.630000,20.000000,'2023-07-05 00:00:00','2023-07-05 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('1fb97020-86a6-4e64-8dc3-70dc030f619f','f68c8cff-ab44-11ef-9b55-dc454691e924',6.950000,18.000000,'2024-09-11 00:00:00','2024-09-11 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('20f9b0e1-da43-4b51-b8b9-61a44fe73149','f68c8cff-ab44-11ef-9b55-dc454691e924',6.390000,0.633802,'2023-12-26 00:00:00','2024-12-27 00:00:00','d6bc19b8-4bde-4d87-9db3-bac3c41476b0',0),('2110e996-ab78-4d8d-b33b-c49bc6211553','f68c9560-ab44-11ef-9b55-dc454691e924',4.630000,21.598270,'2024-05-28 00:00:00','2024-05-28 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('226a24fc-e5c2-414f-973e-ef813e776747','f68c95ef-ab44-11ef-9b55-dc454691e924',10.400000,33.236538,'2024-09-13 00:00:00','2024-09-16 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('244b3955-fd71-4ee4-960c-075871d5950e','f68c9313-ab44-11ef-9b55-dc454691e924',21.580000,0.053753,'2024-04-30 00:00:00','2024-05-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('29e5d9b1-b66d-48fa-b41d-aada63983c55','f68c8cff-ab44-11ef-9b55-dc454691e924',6.200000,0.661290,'2024-01-25 00:00:00','2024-01-25 00:00:00','d6bc19b8-4bde-4d87-9db3-bac3c41476b0',0),('2da0aa85-7e9b-4601-ade4-d93c9972dcc1','f68c968b-ab44-11ef-9b55-dc454691e924',0.923800,13.000000,'2023-06-16 00:00:00','2023-06-16 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('3f747f5b-6cdb-4ece-ab8a-b00be2bde6b0','f68c9742-ab44-11ef-9b55-dc454691e924',0.000000,50.000000,'2018-11-13 00:00:00','2018-11-13 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('3fa74dbf-8b4f-4f5b-8972-eed8241511b2','f68c9560-ab44-11ef-9b55-dc454691e924',5.200000,21.728874,'2024-09-21 00:00:00','2024-09-21 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('40b94e87-911c-4f04-9626-4aafcf98ed22','f68c9802-ab44-11ef-9b55-dc454691e924',12.508900,7.000000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('445614b9-cee4-48c7-b423-dd2a21367371','f68c8cff-ab44-11ef-9b55-dc454691e924',6.540000,16.000000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',1),('44f71a06-25c3-4bd3-9798-5eef897b2948','f68c9896-ab44-11ef-9b55-dc454691e924',0.000000,1.000000,'2023-04-03 00:00:00','2023-04-03 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('45074840-d1b4-498d-ac16-2836d27b86ff','f68c993f-ab44-11ef-9b55-dc454691e924',1.810000,0.160000,'2024-04-22 00:00:00','2024-04-23 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('493d3337-189e-466f-beeb-3d2646a39bbb','f68c99ea-ab44-11ef-9b55-dc454691e924',2.810000,0.968005,'2024-09-30 00:00:00','2024-10-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('4e8e9c95-a4e1-495d-86ef-12a21842d34e','f68c8cff-ab44-11ef-9b55-dc454691e924',5.200000,0.759234,'2024-10-25 00:00:00','2024-10-28 00:00:00','d6bc19b8-4bde-4d87-9db3-bac3c41476b0',0),('5170319e-5842-459f-a40e-9b7911bcfc7f','f68c9560-ab44-11ef-9b55-dc454691e924',4.660000,10.706630,'2024-05-31 00:00:00','2024-05-31 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('5e08ea3f-1a5a-4e26-ab13-9d41edfc7127','f68c8cff-ab44-11ef-9b55-dc454691e924',6.700000,76.344371,'2024-04-22 00:00:00','2024-04-23 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('62987b10-b292-4d08-a01a-41af5e04f58d','f68c9560-ab44-11ef-9b55-dc454691e924',4.970000,34.750503,'2024-05-15 00:00:00','2024-05-15 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('648f7087-b0a4-4564-aa44-56a44750fda8','f68c99ea-ab44-11ef-9b55-dc454691e924',2.950000,1.315678,'2024-10-31 00:00:00','2024-11-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('64b529b7-191c-4015-aa43-7f714cff89c4','f68c9742-ab44-11ef-9b55-dc454691e924',0.000000,2000.000000,'2019-07-26 00:00:00','2019-07-26 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('68f0037f-9b57-44b1-9374-7ffed017a034','f68c9560-ab44-11ef-9b55-dc454691e924',5.000000,1.542000,'2024-01-18 00:00:00','2024-01-19 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('6b8f0432-72d2-451c-b0c9-ad7a4de5fedd','f68c8cff-ab44-11ef-9b55-dc454691e924',5.840000,50.000000,'2023-10-08 00:00:00','2023-10-09 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('7199a6e7-8ee4-4e35-b3d9-dee002c4e600','f68c993f-ab44-11ef-9b55-dc454691e924',0.955000,10.000000,'2023-05-31 00:00:00','2023-05-31 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('721555fc-6480-4523-9a93-fdc8e21d325a','f68c993f-ab44-11ef-9b55-dc454691e924',0.978000,10.000000,'2023-05-31 00:00:00','2023-05-31 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('77fe612a-24e1-43a4-be61-e295fa3bb374','f68c99ea-ab44-11ef-9b55-dc454691e924',2.910000,77.748292,'2024-09-10 00:00:00','2024-09-10 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('81fcb152-691c-40e6-8631-c386ffd87ba7','f68c9a86-ab44-11ef-9b55-dc454691e924',0.955000,12.000000,'2023-06-23 00:00:00','2023-06-23 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('86922edb-6304-4606-a586-b8eb2b29995d','f68c8cff-ab44-11ef-9b55-dc454691e924',6.870000,0.879184,'2024-03-25 00:00:00','2024-03-25 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('889c40c4-f03b-4ba0-9166-e1202c43b644','f68c9313-ab44-11ef-9b55-dc454691e924',10.200000,7.647058,'2024-02-18 00:00:00','2024-02-20 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('8b089856-7d2c-4edc-a9e5-616c6e9cfca1','f68c9560-ab44-11ef-9b55-dc454691e924',5.180000,23.925172,'2024-09-12 00:00:00','2024-09-12 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('8b40c006-5e8b-4d39-901b-22339fef38db','f68c993f-ab44-11ef-9b55-dc454691e924',0.990000,4.000000,'2023-06-15 00:00:00','2023-06-15 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('8b5c795a-9dde-419e-b6fe-40eafd60d8d6','f68c9b35-ab44-11ef-9b55-dc454691e924',9.996100,8.171000,'2024-10-25 00:00:00','2024-10-25 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('8d2ace98-61b4-4c99-af58-f0352ee35801','f68c8cff-ab44-11ef-9b55-dc454691e924',6.750000,23.110986,'2024-10-13 00:00:00','2024-10-13 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('8fe8de1e-fcf4-4fdb-8259-46dbf0bfe7e0','f68c95ef-ab44-11ef-9b55-dc454691e924',9.570000,0.932137,'2024-11-13 00:00:00','2024-11-13 00:00:00','d6bc19b8-4bde-4d87-9db3-bac3c41476b0',0),('9561095f-fd9d-4d37-b203-543c5c4dc226','f68c8cff-ab44-11ef-9b55-dc454691e924',6.700000,5.974755,'2024-10-08 00:00:00','2024-10-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('989fc404-f271-4294-a3d2-e0f12bc69e56','f68c9802-ab44-11ef-9b55-dc454691e924',12.466300,3.275000,'2024-11-22 00:00:00','2024-11-22 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('9973b563-d341-4933-94e2-6e6e7eae5475','f68c9560-ab44-11ef-9b55-dc454691e924',5.430000,9.125230,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('9a51eee4-62cd-41a4-af2d-0d04543fa0dd','f68c9896-ab44-11ef-9b55-dc454691e924',14.350000,1.000000,'2023-05-30 00:00:00','2023-05-30 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('9d1967f9-e599-4eb0-9013-0fe13a8a6010','f68c9a86-ab44-11ef-9b55-dc454691e924',1.000000,12.000000,'2023-06-23 00:00:00','2023-06-23 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('a01356aa-f708-447f-863b-5aeeb8ad35f5','f68c9313-ab44-11ef-9b55-dc454691e924',10.700000,0.047663,'2023-12-29 00:00:00','2024-01-02 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('a039b6c3-ac73-45c1-8943-6dc61b9c71ab','f68c9b35-ab44-11ef-9b55-dc454691e924',9.746600,4.104000,'2024-11-22 00:00:00','2024-11-22 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('a2bb3d1e-b19e-4b4e-af4a-87b7890b9076','f68c9bd8-ab44-11ef-9b55-dc454691e924',4.655000,21.482000,'2024-11-22 00:00:00','2024-11-22 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('a2f415e4-35ce-425a-bd56-89883dabd3db','f68c9ccc-ab44-11ef-9b55-dc454691e924',1.060000,10.000000,'2023-05-30 00:00:00','2023-05-30 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('a5e84fc2-1b62-4aab-a243-016d9da0e161','f68c968b-ab44-11ef-9b55-dc454691e924',0.970000,13.000000,'2023-06-23 00:00:00','2023-07-03 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('a93dd948-6077-4e76-a792-635679d0bb3e','f68c8cff-ab44-11ef-9b55-dc454691e924',5.960000,22.818791,'2024-02-18 00:00:00','2024-02-18 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('aa90cf3e-8414-4129-a7e1-d112ce47af71','f68c9dcb-ab44-11ef-9b55-dc454691e924',0.263600,50.000000,'2023-06-01 00:00:00','2023-04-03 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('b06d84f7-b225-45ee-99d5-a19c8df49608','f68c9313-ab44-11ef-9b55-dc454691e924',9.990000,0.115115,'2024-04-02 00:00:00','2024-04-03 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('b08a77f3-243d-4593-9ba5-40dba5e14c90','f68c8cff-ab44-11ef-9b55-dc454691e924',7.020000,14.245650,'2024-09-21 00:00:00','2024-09-21 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('b4029f0f-5714-4c65-8928-e445b04dd20a','f68c9eb0-ab44-11ef-9b55-dc454691e924',6.445500,14.000000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('b4a99ab6-e01a-469d-abb2-daf230088983','f68ca16c-ab44-11ef-9b55-dc454691e924',5.870000,5.000000,'2023-08-04 00:00:00','2023-08-04 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('b60fc0ae-2710-4733-ad25-3821d6df4831','f68c9313-ab44-11ef-9b55-dc454691e924',9.330000,6.091891,'2023-10-08 00:00:00','2023-10-09 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('b6194d13-52f6-4ca9-ab2a-6f54cd4e2cb1','f68c9313-ab44-11ef-9b55-dc454691e924',10.460000,0.048757,'2024-01-31 00:00:00','2024-02-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('bd9f982c-f90c-45a0-892e-5a2e3bd9c105','f68c9560-ab44-11ef-9b55-dc454691e924',4.440000,88.413902,'2024-04-22 00:00:00','2024-04-23 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('be154ce6-b9ab-488d-92b1-2848ef2347ff','f68c9560-ab44-11ef-9b55-dc454691e924',5.010000,33.932237,'2024-08-15 00:00:00','2024-08-15 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('c11a21eb-7df1-4f88-9bdb-829706aeb5e8','f68c9313-ab44-11ef-9b55-dc454691e924',23.360000,0.000428,'2024-06-28 00:00:00','2024-07-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('c202f49c-709f-41a3-99de-b0acd1bcb381','f68c95ef-ab44-11ef-9b55-dc454691e924',10.520000,10.766520,'2024-09-21 00:00:00','2024-09-23 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('c309a112-abca-4a4f-ab19-82c4a1e23b6a','f68c9560-ab44-11ef-9b55-dc454691e924',5.330000,2.309859,'2024-10-25 00:00:00','2024-11-25 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('c43856cb-7028-42fe-a325-5c5e1ea626a3','f68c8cff-ab44-11ef-9b55-dc454691e924',6.930000,32.728206,'2024-09-10 00:00:00','2024-09-10 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('c8f62123-9b58-460b-a7cb-66ccbf62407f','f68c9313-ab44-11ef-9b55-dc454691e924',10.150000,0.051231,'2024-02-29 00:00:00','2024-03-01 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('c9d3b038-ec8d-41f4-a6fd-d5837f8ddcc1','f68c9560-ab44-11ef-9b55-dc454691e924',5.570000,17.953321,'2024-11-22 00:00:00','2024-11-22 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('cdd75ef2-473f-4286-bacf-59ba0a02a90c','f68c99ea-ab44-11ef-9b55-dc454691e924',2.900000,38.616291,'2024-10-23 00:00:00','2024-10-23 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('cea4842c-e9d8-47d2-83e1-55aba97c6984','f68c9560-ab44-11ef-9b55-dc454691e924',4.150000,32.530353,'2024-02-18 00:00:00','2024-02-20 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('cff8f42b-783a-418b-aca3-23350e9c50ea','f68c9313-ab44-11ef-9b55-dc454691e924',23.430000,0.055480,'2024-09-16 00:00:00','2024-09-17 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('d1281ad0-4b33-4575-b495-85681721e868','f68c9560-ab44-11ef-9b55-dc454691e924',3.890000,51.414609,'2023-10-08 00:00:00','2023-10-09 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('d329b571-2dee-443e-bc49-d71bad40c9b8','f68c9802-ab44-11ef-9b55-dc454691e924',12.509100,0.994000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('d5c6f6c4-7071-4a04-b16d-0de66016967c','f68c9313-ab44-11ef-9b55-dc454691e924',23.920000,0.000418,'2024-07-31 00:00:00','2024-08-01 00:00:00','d6bc19b8-4bde-4d87-9db3-bac3c41476b0',1),('dadd0538-7223-481e-8a19-91141c323316','f68c8cff-ab44-11ef-9b55-dc454691e924',5.990000,0.694490,'2024-02-26 00:00:00','2024-02-26 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('db441c24-653d-43c5-bce6-c4e34060d994','f68c8cff-ab44-11ef-9b55-dc454691e924',6.660000,7.572070,'2024-11-22 00:00:00','2024-11-22 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('decdb02d-6bc7-47e2-84f6-78a005aaeb78','f68c99ea-ab44-11ef-9b55-dc454691e924',2.800000,32.142754,'2024-09-21 00:00:00','2024-09-23 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('e158cb06-c7ec-4b62-9ecb-45b8fabad844','f68c9ccc-ab44-11ef-9b55-dc454691e924',1.050000,10.000000,'2023-06-01 00:00:00','2023-06-01 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('e38ed803-7d48-4a6e-b696-f6fabcd0e0c5','f68ca227-ab44-11ef-9b55-dc454691e924',4.650000,45.000000,'2024-11-22 00:00:00','2024-11-22 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('e57fcd99-6de0-442d-ae5a-0fe4b924f760','f68c9313-ab44-11ef-9b55-dc454691e924',22.470000,0.000445,'2024-05-31 00:00:00','2024-06-03 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('e86bbeeb-6f2f-4f80-858b-537876e675ab','f68ca2ea-ab44-11ef-9b55-dc454691e924',12.430000,6.000000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('eb85288c-36d3-44a1-bcd5-529f4c8be8ec','f68ca16c-ab44-11ef-9b55-dc454691e924',6.850000,5.000000,'2024-04-22 00:00:00','2024-04-23 00:00:00','8d3196f9-715a-11ef-b1e8-a4f933c45288',0),('ebe011ee-a4b1-4bb0-8d71-a5f2d4209b49','f68c9eb0-ab44-11ef-9b55-dc454691e924',6.450000,0.053000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('f0058b1c-78dc-4337-a297-22b360484adb','f68c95ef-ab44-11ef-9b55-dc454691e924',9.530000,16.000000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('f085f6b3-e4a8-4c9f-b418-951a1d8d77db','f68c8cff-ab44-11ef-9b55-dc454691e924',6.540000,16.000000,'2024-11-08 00:00:00','2024-11-08 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('f0fdbcf9-594a-4808-b79d-1fbef327be09','f68c95ef-ab44-11ef-9b55-dc454691e924',10.410000,29.779058,'2024-09-29 00:00:00','2024-09-30 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('f8cdae52-1051-4eae-bb8b-9013abcae3d5','f68c9560-ab44-11ef-9b55-dc454691e924',4.380000,2.926940,'2024-04-18 00:00:00','2024-04-19 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('f9fb57f1-dce1-41ad-b62c-f90ceee77b5a','f68c9313-ab44-11ef-9b55-dc454691e924',22.940000,0.000436,'2024-08-30 00:00:00','2024-09-03 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0),('fb6e9909-36a2-4821-9de2-73e0c2bf5337','f68c9313-ab44-11ef-9b55-dc454691e924',25.530000,9.792554,'2024-11-12 00:00:00','2024-11-12 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('fc15a78a-6f3b-4dc2-9154-a30bea91a89d','f68c9313-ab44-11ef-9b55-dc454691e924',23.920000,0.000418,'2024-07-31 00:00:00','2024-08-01 00:00:00','d6bc19b8-4bde-4d87-9db3-bac3c41476b0',0),('fd4f1437-6b9d-4fbd-8f8b-ff94a551af3c','f68ca2ea-ab44-11ef-9b55-dc454691e924',12.600000,19.841662,'2024-10-23 00:00:00','2024-10-23 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('ff0bb8b6-f6aa-4040-8cf5-369013a9b313','f68c9dcb-ab44-11ef-9b55-dc454691e924',0.262200,50.000000,'2023-05-30 00:00:00','2023-05-30 00:00:00','f5f589b0-71ce-4fee-af61-7516f11a90e2',0),('ffbee42d-cd4c-4da6-b119-391117811ee9','f68c95ef-ab44-11ef-9b55-dc454691e924',10.320000,0.511637,'2024-10-09 00:00:00','2024-10-10 00:00:00','D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0',0);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
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
INSERT INTO `user_stocks` VALUES ('f68c8cff-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','07e1dc3e-948e-11ef-9086-dc454691e924',0),('f68c9209-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','0953e82c-1178-4576-8438-2fdb28e79ea6',0),('f68c9313-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',0),('f68c93b5-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','e0234117-1d79-458b-a835-76fbd5f2175c',0),('f68c945a-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','8b8006b6-06db-4a6b-85b9-531897931ff3',0),('f68c9560-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0953e82c-1178-4576-8438-2fdb28e79ea6',0),('f68c95ef-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','7a664c2c-0324-4ba4-8be4-f1712a7f90be',0),('f68c968b-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','6da27f30-10a4-4dec-9ae9-09f0f0d33273',0),('f68c9742-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','e90ef920-c094-4dc8-99dd-2478cb232cda',0),('f68c9802-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','0ea78bec-d7cc-499f-b42b-607d226d8480',0),('f68c9896-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','153d4589-7168-11ef-b1e8-a4f933c45288',0),('f68c993f-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','9c534e96-b549-4bda-a970-a67ad27a5db8',0),('f68c99ea-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','46d7a5e8-c4a0-49cc-ae1f-5b4ef808287b',0),('f68c9a86-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','c62d9b2a-4b34-49c0-8ed3-09137c6e3851',0),('f68c9b35-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','7a664c2c-0324-4ba4-8be4-f1712a7f90be',0),('f68c9bd8-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','24c84486-9b88-4ff9-9393-3f6a36a75d8f',0),('f68c9ccc-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0696dddc-a874-4664-94ac-9692bf85c136',0),('f68c9dcb-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','6cfb03c3-92e4-44ff-96d6-419310a7d86d',0),('f68c9eb0-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','07e1dc3e-948e-11ef-9086-dc454691e924',0),('f68ca16c-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','55e7979a-1fd7-4482-ae74-7a84351c6537',0),('f68ca227-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','24c84486-9b88-4ff9-9393-3f6a36a75d8f',0),('f68ca2ea-ab44-11ef-9b55-dc454691e924','071e5e85-aa78-11ef-9b55-dc454691e924','80e43ec8-016a-453d-b4ff-80d9d79a2bc7','0ea78bec-d7cc-499f-b42b-607d226d8480',0);
/*!40000 ALTER TABLE `user_stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('071e5e85-aa78-11ef-9b55-dc454691e924','rexthestrange','8475d5983e770129326d0a9148103efc6641ca2bfd7cc8166d979d7be3acf447');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

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
/*!50001 VIEW `activity_view` AS select `tac`.`id` AS `id`,`ust`.`user_id` AS `user_id`,`brk`.`id` AS `broker_id`,`tck`.`id` AS `ticker_id`,`brk`.`name` AS `broker`,`tck`.`symbol` AS `symbol`,concat(`tck`.`name`,if((`tck`.`price` = -(1)),' (Defunct)','')) AS `company`,`tac`.`price` AS `cost_price`,`tck`.`price` AS `current_price`,`tac`.`quantity` AS `quantity`,`ttp`.`name` AS `transaction_type`,`tac`.`transaction_date` AS `transaction_date` from ((((`transactions` `tac` join `user_stocks` `ust` on((`ust`.`id` = `tac`.`user_stocks_id`))) join `brokers` `brk` on((`brk`.`id` = `ust`.`broker_id`))) join `tickers` `tck` on((`tck`.`id` = `ust`.`ticker_id`))) join `transaction_types` `ttp` on((`ttp`.`id` = `tac`.`transaction_type_id`))) where (0 = `tac`.`deleted`) union select `spl`.`id` AS `id`,`ust`.`user_id` AS `user_id`,`brk`.`id` AS `broker_id`,`tck`.`id` AS `ticker_id`,`brk`.`name` AS `broker`,`tck`.`symbol` AS `symbol`,`tck`.`name` AS `name`,0 AS `cost_price`,`tck`.`price` AS `current_price`,(`spl`.`current` / `spl`.`previous`) AS `quantity`,'Split' AS `transaction_type`,`spl`.`split_date` AS `transaction_date` from (((`splits` `spl` join `user_stocks` `ust` on((`ust`.`id` = `spl`.`user_stocks_id`))) join `brokers` `brk` on((`brk`.`id` = `ust`.`broker_id`))) join `tickers` `tck` on((`tck`.`id` = `ust`.`ticker_id`))) where (0 = `spl`.`deleted`) order by `broker`,`company`,`transaction_date`,field(`transaction_type`,'Buy','Split','Sell') */;
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

-- Dump completed on 2024-11-25  9:57:52
