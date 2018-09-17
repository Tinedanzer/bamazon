DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
item_id INT(15) AUTO_INCREMENT NOT NULL PRIMARY KEY,
product_name VARCHAR(30),
department_name VARCHAR(30),
price DECIMAL (10,2),
stock_quantity INTEGER(15)
);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('real-life lemming', 'toys', 200, 3), ('gamecube', 'toys', 50, 10), ('off-brand controller', 'trash', 20, 200),
("condoms", 'pharmacy', 500, 10000000), ('abortions', 'pharmacy', 5000000, 0),
('baby milk', 'grocery', 50, 1000), ('doula','Customer Service', 20, 10), ('best deathmetal cds', 'trash', 12, 150),
('divorce attorney', 'Customer Service', 2000, 10), ('dog', 'Customer Service', 100, 50);
SELECT * FROM products;


