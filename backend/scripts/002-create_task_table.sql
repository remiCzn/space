CREATE TABLE SPACE.task
(
    id    INTEGER      not null AUTO_INCREMENT,
    user  INTEGER      not null,
    title VARCHAR(255) not null,
    FOREIGN KEY (user) REFERENCES SPACE.user (id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);