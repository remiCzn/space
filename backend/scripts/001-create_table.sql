CREATE DATABASE SPACE;

CREATE TABLE SPACE.USER (
    id INTEGER not null AUTO_INCREMENT,
    email VARCHAR(255) not null,
    password VARCHAR(255) not null,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE SPACE.FOLDER (
    id INTEGER not null AUTO_INCREMENT,
    title VARCHAR(255) not null,
    user INTEGER not null,
    parent INTEGER,
    PRIMARY KEY (id)
);