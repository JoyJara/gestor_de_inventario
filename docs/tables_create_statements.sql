-- Tablas --

CREATE TABLE `actionContext` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `context` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `categories` (
  `categoryID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL DEFAULT 'N/A',
  PRIMARY KEY (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `employees` (
  `employeeID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `celphone` varchar(20) NOT NULL,
  `role` int NOT NULL,
  `hiringDate` date NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`employeeID`),
  UNIQUE KEY `usuario` (`username`),
  KEY `fk_employees_role` (`role`),
  CONSTRAINT `fk_employees_role` FOREIGN KEY (`role`) REFERENCES `roles` (`roleID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `entityTypes` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `entity` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `inventory` (
  `inventoryID` int NOT NULL AUTO_INCREMENT,
  `productID` int NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `lastUpdateDate` datetime DEFAULT NULL,
  PRIMARY KEY (`inventoryID`),
  KEY `IDproducto` (`productID`),
  KEY `idxInventarioTienda_Producto` (`productID`),
  CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `posTransactions` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `transactionID` int NOT NULL,
  `actionID` int NOT NULL,
  `actionContextID` int NOT NULL,
  `quantity` int NOT NULL,
  `productID` int NOT NULL,
  `employeeID` int DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_pos_product` (`productID`),
  KEY `fk_pos_employee` (`employeeID`),
  KEY `fk_pos_action` (`actionID`),
  KEY `fk_pos_context` (`actionContextID`),
  KEY `fk_pos_transaction` (`transactionID`),
  CONSTRAINT `fk_pos_action` FOREIGN KEY (`actionID`) REFERENCES `transactionActions` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_pos_context` FOREIGN KEY (`actionContextID`) REFERENCES `actionContext` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_pos_employee` FOREIGN KEY (`employeeID`) REFERENCES `employees` (`employeeID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_pos_product` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pos_transaction` FOREIGN KEY (`transactionID`) REFERENCES `transactionHistory` (`transactionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `products` (
  `productID` int NOT NULL AUTO_INCREMENT,
  `categoryID` int DEFAULT NULL,
  `barcode` double NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL DEFAULT 'N/A',
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`productID`),
  UNIQUE KEY `codigoBarras` (`barcode`),
  UNIQUE KEY `codigoBarras_2` (`barcode`),
  KEY `IDcategoria` (`categoryID`),
  KEY `idxProductoCodigo` (`barcode`),
  CONSTRAINT `fk_products_category` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`categoryID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='		';

CREATE TABLE `roles` (
  `roleID` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`roleID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `sysTransactions` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `transactionID` int NOT NULL,
  `actionID` int NOT NULL,
  `entity` int NOT NULL,
  `entityID` int NOT NULL,
  `actionContextID` int NOT NULL,
  `employeeID` int DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_sys_transaction` (`transactionID`),
  KEY `fk_sys_action` (`actionID`),
  KEY `fk_sys_context` (`actionContextID`),
  KEY `fk_sys_entity` (`entity`),
  KEY `fk_sys_employee` (`employeeID`),
  CONSTRAINT `fk_sys_action` FOREIGN KEY (`actionID`) REFERENCES `transactionActions` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_sys_context` FOREIGN KEY (`actionContextID`) REFERENCES `actionContext` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_sys_employee` FOREIGN KEY (`employeeID`) REFERENCES `employees` (`employeeID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_sys_entity` FOREIGN KEY (`entity`) REFERENCES `entityTypes` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_sys_transaction` FOREIGN KEY (`transactionID`) REFERENCES `transactionHistory` (`transactionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `transactionActions` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `action` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `transactionHistory` (
  `transactionID` int NOT NULL AUTO_INCREMENT,
  `typeID` int NOT NULL,
  PRIMARY KEY (`transactionID`),
  KEY `fk_history_type` (`typeID`),
  CONSTRAINT `fk_history_type` FOREIGN KEY (`typeID`) REFERENCES `transactionTypes` (`typeID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `transactionTypes` (
  `typeID` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`typeID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
