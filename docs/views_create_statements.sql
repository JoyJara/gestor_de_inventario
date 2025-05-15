-- 1. Vista de los empleados --
CREATE ALGORITHM = UNDEFINED 
DEFINER = `Joel`@`%` 
SQL SECURITY DEFINER 
VIEW `employeesView` AS
SELECT 
  `employees`.`employeeID` AS `ID`,
  `employees`.`name` AS `Name`,
  `employees`.`role` AS `Role`,
  `employees`.`celphone` AS `Phone`,
  `employees`.`username` AS `User`,
  `employees`.`active` AS `Status`,
  `employees`.`hiringDate` AS `Hired`
FROM `employees`;

-- 2. Vista del historial de transacciones --
CREATE ALGORITHM = UNDEFINED 
DEFINER = `Joel`@`%` 
SQL SECURITY DEFINER 
VIEW `historyView` AS
-- POS Transactions
SELECT 
  `th`.`transactionID` AS `transactionID`,
  CASE 
    WHEN `tt`.`type` = 'pos' THEN 'Punto de Venta'
    WHEN `tt`.`type` = 'sys' THEN 'Sistema'
    ELSE `tt`.`type`
  END AS `transactionType`,
  CASE 
    WHEN `ta`.`action` = 'inbound' THEN 'Entrada'
    WHEN `ta`.`action` = 'dispatch' THEN 'Salida'
    WHEN `ta`.`action` = 'adjustment' THEN 'Ajuste'
    ELSE `ta`.`action`
  END AS `action`,
  CASE 
    WHEN `ac`.`context` = 'sale' THEN 'Venta'
    WHEN `ac`.`context` = 'return' THEN 'Devolución'
    WHEN `ac`.`context` = 'exchange' THEN 'Intercambio'
    WHEN `ac`.`context` = 'purchase' THEN 'Compra'
    WHEN `ac`.`context` = 'edit' THEN 'Edición'
    WHEN `ac`.`context` = 'delete' THEN 'Eliminación'
    WHEN `ac`.`context` = 'add' THEN 'Adición'
    ELSE `ac`.`context`
  END AS `context`,
  NULL AS `entity`,
  `pt`.`productID` AS `productID`,
  `pt`.`quantity` AS `quantity`,
  `e`.`name` AS `employeeName`,
  `pt`.`date` AS `date`
FROM `transactionHistory` AS `th`
JOIN `transactionTypes` AS `tt` ON `th`.`typeID` = `tt`.`typeID`
JOIN `posTransactions` AS `pt` ON `th`.`transactionID` = `pt`.`transactionID`
JOIN `transactionActions` AS `ta` ON `pt`.`actionID` = `ta`.`ID`
JOIN `actionContext` AS `ac` ON `pt`.`actionContextID` = `ac`.`ID`
JOIN `employees` AS `e` ON `pt`.`employeeID` = `e`.`employeeID`

UNION ALL

-- SYS Transactions
SELECT 
  `th`.`transactionID` AS `transactionID`,
  CASE 
    WHEN `tt`.`type` = 'pos' THEN 'Punto de Venta'
    WHEN `tt`.`type` = 'sys' THEN 'Sistema'
    ELSE `tt`.`type`
  END AS `transactionType`,
  CASE 
    WHEN `ta`.`action` = 'inbound' THEN 'Entrada'
    WHEN `ta`.`action` = 'dispatch' THEN 'Salida'
    WHEN `ta`.`action` = 'adjustment' THEN 'Ajuste'
    ELSE `ta`.`action`
  END AS `action`,
  CASE 
    WHEN `ac`.`context` = 'sale' THEN 'Venta'
    WHEN `ac`.`context` = 'return' THEN 'Devolución'
    WHEN `ac`.`context` = 'exchange' THEN 'Intercambio'
    WHEN `ac`.`context` = 'purchase' THEN 'Compra'
    WHEN `ac`.`context` = 'edit' THEN 'Edición'
    WHEN `ac`.`context` = 'delete' THEN 'Eliminación'
    WHEN `ac`.`context` = 'add' THEN 'Adición'
    ELSE `ac`.`context`
  END AS `context`,
  CASE 
    WHEN `et`.`entity` = 'product' THEN 'Producto'
    WHEN `et`.`entity` = 'employee' THEN 'Empleado'
    WHEN `et`.`entity` = 'report' THEN 'Reporte'
    ELSE `et`.`entity`
  END AS `entity`,
  NULL AS `productID`,
  NULL AS `quantity`,
  `e`.`name` AS `employeeName`,
  `st`.`date` AS `date`
FROM `transactionHistory` AS `th`
JOIN `transactionTypes` AS `tt` ON `th`.`typeID` = `tt`.`typeID`
JOIN `sysTransactions` AS `st` ON `th`.`transactionID` = `st`.`transactionID`
JOIN `transactionActions` AS `ta` ON `st`.`actionID` = `ta`.`ID`
JOIN `actionContext` AS `ac` ON `st`.`actionContextID` = `ac`.`ID`
JOIN `entityTypes` AS `et` ON `st`.`entity` = `et`.`ID`
JOIN `employees` AS `e` ON `st`.`employeeID` = `e`.`employeeID`;

-- 3. Vista del inventario para la página 'Iventory.tsx' --
CREATE ALGORITHM = UNDEFINED 
DEFINER = `JoyJara`@`%` 
SQL SECURITY DEFINER 
VIEW `inventoryView` AS
SELECT 
  `p`.`productID` AS `ID`,
  `p`.`name` AS `Name`,
  `c`.`name` AS `Category`,
  `i`.`stock` AS `Stock`,
  `p`.`price` AS `Price`
FROM `inventory` AS `i`
JOIN `products` AS `p` ON `i`.`productID` = `p`.`productID`
JOIN `categories` AS `c` ON `p`.`categoryID` = `c`.`categoryID`;

-- 4. Vista de los productos con stock bajo (menor a 10) --
CREATE ALGORITHM = UNDEFINED 
DEFINER = `JoyJara`@`%` 
SQL SECURITY DEFINER 
VIEW `lowStock` AS
SELECT 
  `p`.`productID` AS `ID`,
  `p`.`name` AS `Product`,
  `i`.`stock` AS `Stock`
FROM `inventory` AS `i`
JOIN `products` AS `p` ON `i`.`productID` = `p`.`productID`
WHERE `i`.`stock` < 10;

-- 5. Vista de sugerencias de productos para el POS --
CREATE ALGORITHM = UNDEFINED 
DEFINER = `Joel`@`%` 
SQL SECURITY DEFINER 
VIEW `productSuggestion` AS
SELECT 
  `products`.`productID` AS `ID`,
  `products`.`name` AS `name`,
  `products`.`barcode` AS `barcode`
FROM `products`;
