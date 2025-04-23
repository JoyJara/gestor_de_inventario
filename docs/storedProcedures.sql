-- En este archivo sql se lleva el registro de los procedimientos almacenados de la base de datos --
-- Si vas a crear un procedimiento, usa variables en inglés, tus comentarios si pueden ser en español --

-- Procedimiento para ELIMINAR productos --
DELIMITER $$
CREATE PROCEDURE deleteProduct(IN productID INT)
BEGIN
	DECLARE done INT DEFAULT FALSE;
    DECLARE childTable VARCHAR(64);
    DECLARE childColumn VARCHAR(64);
    
-- 1. Cursor que recorrer todas las FKs que hacen referencia a la tabla productos --
	DECLARE fkCursor CURSOR FOR
		SELECT TABLE_NAME, COLUMN_NAME
		FROM information_schema.KEY_COLUMN_USAGE
		WHERE
			REFERENCED_TABLE_SCHEMA = DATABASE()
			AND REFERENCED_TABLE_NAME = 'productos';

-- 2. Handler que finaliza el recorrido del cursor --
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

-- 3. DELETE dinámico para cada tabla hija que exista --
	OPEN fkCursor;
	readLoop: LOOP
		FETCH fkCursor INTO childTable, childColumn;
		IF done THEN LEAVE readLoop;
		END IF;
		
		SET @sql_text = CONCAT(
			'DELETE FROM ', childTable, ' ', 'WHERE ', childColumn, ' = ', productID
		);
		PREPARE statement FROM @sql_text;
		EXECUTE statement;
		DEALLOCATE PREPARE statement;
	END LOOP;
	CLOSE fkCursor;

-- 4. Después de borrar las referencias en las tablas hijas, ahora lo borra en la tabla padre --
	DELETE FROM productos WHERE IDproducto = productID;
END$$
DELIMITER ;


-- Procedimiento para EDITAR productos --
DELIMITER $$
CREATE DEFINER=`Joel`@`%` PROCEDURE `editProduct`(
	IN in_productID INT, 
    IN in_name VARCHAR(100), 
    IN in_categoryID INT, 
    IN in_price DECIMAL(10,2), 
    IN in_stock INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Error al actualizar el producto';
	END;
    
    START TRANSACTION;
    UPDATE products as p
		SET p.name 			= in_name, 
            p.categoryID 	= in_categoryID, 
            p.price 		= in_price 
	WHERE p.productID = in_productID;
    
    UPDATE inventory as i
		SET i.stock = in_stock
	WHERE i.productID = in_productID;
    
	COMMIT;
END$$
DELIMITER ;
    
    
-- Procedimiento para AGREGAR nuevos productos --
DELIMITER $$
CREATE PROCEDURE addProduct(
	IN in_name VARCHAR(100), 
    IN in_barcode DOUBLE, 
    IN in_category VARCHAR(100), 
    IN in_description VARCHAR(200), 
    IN in_stock INT, 
    IN in_price DECIMAL(10,2))
BEGIN
    -- Variables de apoyo --
	DECLARE catID INT;
    DECLARE prodID INT;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error al agregar el producto';
	END;
        
	START TRANSACTION;
    -- 1. Obtiene el valor de 'categories.categoryID' en base al nombre y lo guarda en 'catID' --
    SELECT categoryID INTO catID FROM categories WHERE name = in_category LIMIT 1;
	
    IF catID IS NULL THEN 
		ROLLBACK;
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Categoría no encontrada';
	END IF;

    -- 2. Inserta los valores del nuevo producto en la tabla 'products' --
		INSERT INTO products(categoryID, barcode, name, description, price) 
		VALUES (catID, in_barcode, in_name, in_description, in_price);
		
	-- 3. Guarda el product ID del último producto insertado en la tabla 'products' --
        SET prodID = LAST_INSERT_ID();
	
    -- 4. Inserta el ID, stock y última fecha de actualización  del producto en la tabla 'inventory' --
		INSERT INTO inventory(productID, stock, lastUpdateDate)
		VALUES (prodID, in_stock, NOW());
    COMMIT;
END$$
DELIMITER ;