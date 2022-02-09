CREATE DATABASE IF NOT EXISTS SPACE;
CREATE TABLE SPACE.user (
    id INTEGER not null AUTO_INCREMENT,
    email VARCHAR(255) not null,
    password VARCHAR(255) not null,
    username VARCHAR(255) not null,
    PRIMARY KEY (id)
);
CREATE TABLE SPACE.folder (
    id INTEGER not null AUTO_INCREMENT,
    title VARCHAR(255) not null,
    user INTEGER not null,
    parent INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (parent) REFERENCES SPACE.folder(id) ON DELETE CASCADE,
    FOREIGN KEY (user) REFERENCES SPACE.user(id) ON DELETE CASCADE
);