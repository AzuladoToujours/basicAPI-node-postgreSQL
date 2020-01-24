CREATE DATABASE firstapi;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email VARCHAR(128) NOT NULL,
    hashed_password VARCHAR(128) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP

);
