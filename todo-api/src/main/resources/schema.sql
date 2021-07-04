--drop table to make sure existing table is gone if schema is different
DROP TABLE IF EXISTS todo.item;


--creating the user table under dit database.
CREATE TABLE todo.item
( 
item_id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL, 
is_done BOOLEAN,
details  VARCHAR(50), 
to_do_date DATE, 
PRIMARY KEY (item_id) 
);
