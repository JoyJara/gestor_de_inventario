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
