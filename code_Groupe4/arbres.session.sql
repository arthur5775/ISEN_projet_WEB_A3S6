DROP TABLE IF EXISTS ajout_arbre;
DROP TABLE IF EXISTS users;

CREATE TABLE ajout_arbre (
    id SERIAL PRIMARY KEY,
    espece VARCHAR,
    hauteur_totale FLOAT,
    hauteur_tronc FLOAT,
    diametre_tronc FLOAT,
    remarquable VARCHAR,
    latitude FLOAT,
    longitude VARCHAR,
    etat VARCHAR,
    stadedev VARCHAR,
    type_port VARCHAR,
    type_pied VARCHAR,
    cluster VARCHAR
);

CREATE TABLE users (
    login VARCHAR PRIMARY KEY,
    nickname VARCHAR NOT NULL,
    password VARCHAR NOT NULL
)