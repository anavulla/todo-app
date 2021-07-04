CREATE USER 'todoitemsappid'@'localhost' IDENTIFIED BY 'MyPass@123';

CREATE DATABASE todo;

GRANT ALL PRIVILEGES ON todo.* TO 'todoitemsappid'@'localhost';
