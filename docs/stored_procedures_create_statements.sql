-- 1. SP para agregar productos --
DELIMITER $$
CREATE DEFINER=`Joel`@`%` PROCEDURE `addProduct`(
  IN in_name VARCHAR(100),
  IN in_barcode VARCHAR(100),
  IN in_categoryID INT,
  IN in_description TEXT,
  IN in_stock INT,
  IN in_price DECIMAL(10,2),
  IN in_employeeID INT
)
BEGIN
  DECLARE newProductID INT;
  DECLARE newTransactionID INT;

  START TRANSACTION;

  INSERT INTO products (name, barcode, categoryID, description, price)
  VALUES (in_name, in_barcode, in_categoryID, in_description, in_price);

  SET newProductID = LAST_INSERT_ID();

 INSERT INTO inventory(productID, stock, lastUpdateDate)
 VALUES(newProductID, in_stock, CURDATE());

  INSERT INTO transactionHistory (typeID) VALUES (2); -- 2 = sys
  SET newTransactionID = LAST_INSERT_ID();

  INSERT INTO sysTransactions (
    transactionID, actionID, actionContextID, entity, entityID, employeeID, date
  ) VALUES (
    newTransactionID, 1, 7, 1, newProductID, in_employeeID, CURDATE()
  );

  COMMIT;
END$$
DELIMITER ;

-- 2. SP para agregar stock a un único producto en base a su 'productID' --
DELIMITER $$
CREATE DEFINER=`Joel`@`%` PROCEDURE `addStock`(
    IN p_productID INT,
    IN p_quantity INT
)
BEGIN
    UPDATE inventory
    SET stock = stock + p_quantity
    WHERE productID = p_productID;
END$$
DELIMITER ;

-- 3. SP para agregar nuevos usuarios a la tabla 'employees' --
DELIMITER $$
CREATE DEFINER=`Joel`@`%` PROCEDURE `addUser`(
  IN in_name VARCHAR(100),
  IN in_celphone VARCHAR(20),
  IN in_role INT,
  IN in_hiringDate DATE,
  IN in_username VARCHAR(50),
  IN in_password VARCHAR(100),
  IN in_active TINYINT(1),
  IN in_executorID INT -- quien está registrando
)
BEGIN
  DECLARE newEmployeeID INT;
  DECLARE newTransactionID INT;

  START TRANSACTION;

  INSERT INTO employees (
    name, celphone, role, hiringDate, username, password, active
  )
  VALUES (
    in_name, in_celphone, in_role, in_hiringDate, in_username, in_password, in_active
  );

  SET newEmployeeID = LAST_INSERT_ID();

  INSERT INTO transactionHistory (typeID) VALUES (2); -- 2 = sys
  SET newTransactionID = LAST_INSERT_ID();

  INSERT INTO sysTransactions (
    transactionID, actionID, actionContextID, entity, entityID, employeeID, date
  )
  VALUES (
    newTransactionID, 1, 7, 2, newEmployeeID, in_executorID, CURDATE()
  );

  COMMIT;
END$$
DELIMITER ;

-- 4. SP para eliminar un único producot en base a su 'productID' --
DELIMITER $$
CREATE DEFINER=`Joel`@`%` PROCEDURE `deleteProduct`(
  IN in_productID INT,
  IN in_employeeID INT
)
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE childTable VARCHAR(64);
  DECLARE childColumn VARCHAR(64);
  DECLARE newTransactionID INT;

  -- Cursor para encontrar todas las FKs que referencian a 'products'
  DECLARE fkCursor CURSOR FOR
    SELECT TABLE_NAME, COLUMN_NAME
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE
      REFERENCED_TABLE_SCHEMA = DATABASE()
      AND REFERENCED_TABLE_NAME = 'products';

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

  START TRANSACTION;

  -- Borrar en tablas hijas
  OPEN fkCursor;
  readLoop: LOOP
    FETCH fkCursor INTO childTable, childColumn;
    IF done THEN LEAVE readLoop; END IF;

    SET @sql_text = CONCAT(
      'DELETE FROM `', childTable, '` WHERE `', childColumn, '` = ?'
    );

    PREPARE stmt FROM @sql_text;
    SET @productID = in_productID;
    EXECUTE stmt USING @productID;
    DEALLOCATE PREPARE stmt;
  END LOOP;
  CLOSE fkCursor;

  -- Borrar en tabla principal
  DELETE FROM products WHERE productID = in_productID;

  -- Registrar transacción
  INSERT INTO transactionHistory (typeID) VALUES (2); -- tipo 2 = eliminación
  SET newTransactionID = LAST_INSERT_ID();

  INSERT INTO sysTransactions (
    transactionID, actionID, actionContextID, entity, entityID, employeeID, date
  ) VALUES (
    newTransactionID, 3, 6, 1, in_productID, in_employeeID, CURDATE()
  );

  COMMIT;
END$$
DELIMITER ;

-- 5. SP para eliminar un usuario en base a su ID --
DELIMITER $$
CREATE DEFINER=`Joel`@`%` PROCEDURE `deleteUser`(
  IN in_employeeID INT,
  IN in_executorID INT
)
BEGIN
  DECLARE newTransactionID INT;

  START TRANSACTION;

  DELETE FROM employees WHERE employeeID = in_employeeID;

  INSERT INTO transactionHistory (typeID) VALUES (2); -- sys
  SET newTransactionID = LAST_INSERT_ID();

  INSERT INTO sysTransactions (
    transactionID, actionID, actionContextID, entity, entityID, employeeID, date
  )
  VALUES (
    newTransactionID, 3, 6, 2, in_employeeID, in_executorID, CURDATE()
  );

  COMMIT;
END$$
DELIMITER ;

-- 6. SP para editar la información de un producto --
DELIMITER $$
CREATE DEFINER=`Joel`@`%` PROCEDURE `editProduct`(
  IN in_productID INT,
  IN in_name VARCHAR(100),
  IN in_categoryID INT,
  IN in_price DECIMAL(10,2),
  IN in_stock INT,
  IN in_employeeID INT
)
BEGIN
  DECLARE newTransactionID INT;

  START TRANSACTION;

  -- Actualiza la tabla 'products' sin 'stock'
  UPDATE products
  SET name = in_name,
      categoryID = in_categoryID,
      price = in_price
  WHERE productID = in_productID;

  -- Actualiza la tabla 'inventory' para modificar el stock
  UPDATE inventory
  SET stock = in_stock
  WHERE productID = in_productID;

  -- Registrar la transacción
  INSERT INTO transactionHistory (typeID) VALUES (2);
  SET newTransactionID = LAST_INSERT_ID();

  INSERT INTO sysTransactions (
    transactionID, actionID, actionContextID, entity, entityID, employeeID, date
  ) VALUES (
    newTransactionID, 3, 5, 1, in_productID, in_employeeID, CURDATE()
  );

  COMMIT;
END$$
DELIMITER ;

-- 7. SP para editar la información de un usuario (menos la contraseña) --
DELIMITER $$
CREATE DEFINER=`Joel`@`%` PROCEDURE `editUser`(
  IN in_employeeID INT,
  IN in_name VARCHAR(100),
  IN in_celphone VARCHAR(20),
  IN in_role INT,
  IN in_hiringDate DATE,
  IN in_username VARCHAR(50),
  IN in_status TINYINT(1),
  IN in_executorID INT
)
BEGIN
  DECLARE newTransactionID INT;

  START TRANSACTION;

  UPDATE employees
  SET
    name = in_name,
    celphone = in_celphone,
    role = in_role,
    hiringDate = in_hiringDate,
    username = in_username,
    active = in_status
  WHERE employeeID = in_employeeID;

  INSERT INTO transactionHistory (typeID) VALUES (2); -- sys
  SET newTransactionID = LAST_INSERT_ID();

  INSERT INTO sysTransactions (
    transactionID, actionID, actionContextID, entity, entityID, employeeID, date
  )
  VALUES (
    newTransactionID, 3, 5, 2, in_employeeID, in_executorID, CURDATE()
  );

  COMMIT;
END$$
DELIMITER ;


-- 8. SP para loggerar devolución en las tablas de transacciones --
DELIMITER $$
CREATE DEFINER=`Joel`@`%` PROCEDURE `logReturn`(
  IN in_actionID INT,
  IN in_actionContextID INT,
  IN in_employeeID INT,
  IN in_date DATE,
  IN in_productsJSON JSON
)
BEGIN
  DECLARE currentTransactionID INT;
  DECLARE i INT DEFAULT 0;
  DECLARE total INT;
  DECLARE currentProductID INT;
  DECLARE currentQuantity INT;

  -- Iniciar transacción
  START TRANSACTION;

  -- Obtener la cantidad de productos en el JSON
  SET total = JSON_LENGTH(in_productsJSON);

  -- Insertar en transactionHistory transacción del sistema.
  INSERT INTO transactionHistory (typeID)
  VALUES (1);

  SET currentTransactionID = LAST_INSERT_ID();

  -- Recorrer y procesar cada producto
  WHILE i < total DO
    SET currentProductID = CAST(JSON_UNQUOTE(JSON_EXTRACT(in_productsJSON, CONCAT('$[', i, '].productID'))) AS UNSIGNED);
    SET currentQuantity = CAST(JSON_UNQUOTE(JSON_EXTRACT(in_productsJSON, CONCAT('$[', i, '].quantity'))) AS UNSIGNED);

    -- Insertar en posTransactions
    INSERT INTO posTransactions (
      transactionID,
      actionID,
      actionContextID,
      quantity,
      productID,
      employeeID,
      date
    )
    VALUES (
      currentTransactionID,
      in_actionID,
      in_actionContextID,
      currentQuantity,
      currentProductID,
      in_employeeID,
      in_date
    );

    -- Sumar el stock devuelto
    UPDATE inventory
    SET stock = stock + currentQuantity
    WHERE productID = currentProductID;

    SET i = i + 1;
  END WHILE;

  COMMIT;
END$$
DELIMITER ;


-- 9. SP para loggear ventas en las tablas de transacciones --
DELIMITER $$
CREATE DEFINER=`Joel`@`%` PROCEDURE `logSale`(
  IN in_actionID INT,
  IN in_actionContextID INT,
  IN in_employeeID INT,
  IN in_date DATE,
  IN in_productsJSON JSON
)
BEGIN
  DECLARE currentTransactionID INT;
  DECLARE i INT DEFAULT 0;
  DECLARE total INT;
  DECLARE currentProductID INT;
  DECLARE currentQuantity INT;
  DECLARE availableStock INT;
  DECLARE productName VARCHAR(100);
  DECLARE errorMsg TEXT DEFAULT '';
  DECLARE hasError BOOLEAN DEFAULT FALSE;

  -- Iniciar transacción
  START TRANSACTION;

  -- Obtener el tamaño del array JSON
  SET total = JSON_LENGTH(in_productsJSON);

  -- Verificar el stock de cada producto
  SET i = 0;
  WHILE i < total DO
    SET currentProductID = JSON_UNQUOTE(JSON_EXTRACT(in_productsJSON, CONCAT('$[', i, '].productID')));
    SET currentQuantity = JSON_UNQUOTE(JSON_EXTRACT(in_productsJSON, CONCAT('$[', i, '].quantity')));

	SELECT i.stock, p.name
	INTO availableStock, productName
	FROM inventory i
	JOIN products p ON i.productID = p.productID
	WHERE i.productID = currentProductID
	FOR UPDATE;

    IF availableStock < currentQuantity THEN
		SET hasError = TRUE;
		IF errorMsg = '' THEN
		  SET errorMsg = productName;
		ELSE
		  SET errorMsg = CONCAT(errorMsg, ', ', productName);
		END IF;
    END IF;

    SET i = i + 1;
  END WHILE;

  IF hasError THEN
    ROLLBACK;
    SET errorMsg = CONCAT('Rebasó el stock disponible: ', errorMsg);
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = errorMsg;
  ELSE
    -- Reiniciar índice para inserción
    SET i = 0;

    -- Insertar en transactionHistory
    INSERT INTO transactionHistory (typeID)
    VALUES (1);

    SET currentTransactionID = LAST_INSERT_ID();

    -- Insertar cada producto y actualizar su stock
    WHILE i < total DO
      SET currentProductID = JSON_UNQUOTE(JSON_EXTRACT(in_productsJSON, CONCAT('$[', i, '].productID')));
      SET currentQuantity = JSON_UNQUOTE(JSON_EXTRACT(in_productsJSON, CONCAT('$[', i, '].quantity')));

      -- Insertar en posTransactions
      INSERT INTO posTransactions (
        transactionID,
        actionID,
        actionContextID,
        quantity,
        productID,
        employeeID,
        date
      )
      VALUES (
        currentTransactionID,
        in_actionID,
        in_actionContextID,
        currentQuantity,
        currentProductID,
        in_employeeID,
        in_date
      );

      -- Actualizar el stock
      UPDATE inventory
      SET stock = stock - currentQuantity
      WHERE productID = currentProductID;

      SET i = i + 1;
    END WHILE;

    COMMIT;
  END IF;
END$$
DELIMITER ;
