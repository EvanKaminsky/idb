use tipsy_backend;

DROP TABLE IF EXISTS COCKTAIL_TAGS;
DROP TABLE IF EXISTS INGREDIENT_TAGS;
DROP TABLE IF EXISTS BRAND_TAGS;
DROP TABLE IF EXISTS COUNTRY_TAGS;

DROP TABLE IF EXISTS COUNTRY_TAGS;
DROP TABLE IF EXISTS COCKTAIL_INGREDIENT;
DROP TABLE IF EXISTS COCKTAIL_BRAND;
DROP TABLE IF EXISTS COCKTAIL_COUNTRY;
DROP TABLE IF EXISTS INGREDIENT_BRAND;
DROP TABLE IF EXISTS INGREDIENT_COUNTRY;
DROP TABLE IF EXISTS BRAND_COUNTRY;

DROP TABLE IF EXISTS TAGS;
DROP TABLE IF EXISTS COCKTAILS;
DROP TABLE IF EXISTS INGREDIENTS;
DROP TABLE IF EXISTS BRANDS;
DROP TABLE IF EXISTS COUNTRIES;


CREATE TABLE COCKTAILS (
	id int NOT NULL,
	stdname varchar(255) NOT NULL,
	name varchar(255),
	imageurl varchar(255),
	color int,
	description varchar(10000),
	videourl varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE INGREDIENTS (
	id int NOT NULL,
	stdname varchar(255) NOT NULL,
	name varchar(255),
	imageurl varchar(255),
	color int,
	description varchar(10000),
	abv decimal(4,2),
	PRIMARY KEY (id)
);

CREATE TABLE BRANDS (
	id int NOT NULL,
	stdname varchar(255) NOT NULL,
	name varchar(255),
	imageurl varchar(255),
	color int,
	description varchar(10000),
	websiteurl varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE COUNTRIES (
	id int NOT NULL,
	stdname varchar(255) NOT NULL,
	name varchar(255),
	imageurl varchar(255),
	color int,
	description varchar(10000),
	continent varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE TAGS (
	id int NOT NULL,
	label varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE COCKTAIL_TAGS (
	cocktailID int NOT NULL,
	tagID int NOT NULL,
	CONSTRAINT FOREIGN KEY (cocktailID) REFERENCES COCKTAILS(id),
	CONSTRAINT FOREIGN KEY (tagID) REFERENCES TAGS(id)
);

CREATE TABLE INGREDIENT_TAGS (
	ingredientID int NOT NULL,
	tagID int NOT NULL,
	CONSTRAINT FOREIGN KEY (ingredientID) REFERENCES INGREDIENTS(id),
	CONSTRAINT FOREIGN KEY (tagID) REFERENCES TAGS(id)
);

CREATE TABLE BRAND_TAGS (
	brandID int NOT NULL,
	tagID int NOT NULL,
	CONSTRAINT FOREIGN KEY (brandID) REFERENCES BRANDS(id),
	CONSTRAINT FOREIGN KEY (tagID) REFERENCES TAGS(id)
);

CREATE TABLE COUNTRY_TAGS (
	countryID int NOT NULL,
	tagID int NOT NULL,
	CONSTRAINT FOREIGN KEY (countryID) REFERENCES COUNTRIES(id),
	CONSTRAINT FOREIGN KEY (tagID) REFERENCES TAGS(id)
);

CREATE TABLE COCKTAIL_INGREDIENT (
	cocktailID int,
	ingredientID int,
	CONSTRAINT FOREIGN KEY (cocktailID) REFERENCES COCKTAILS(id),
	CONSTRAINT FOREIGN KEY (ingredientID) REFERENCES INGREDIENTS(id)
);

CREATE TABLE COCKTAIL_BRAND (
	cocktailID int,
	brandID int,
	CONSTRAINT FOREIGN KEY (cocktailID) REFERENCES COCKTAILS(id),
	CONSTRAINT FOREIGN KEY (brandID) REFERENCES BRANDS(id)
);

CREATE TABLE COCKTAIL_COUNTRY (
	cocktailID int,
	countryID int,
	CONSTRAINT FOREIGN KEY (cocktailID) REFERENCES COCKTAILS(id),
	CONSTRAINT FOREIGN KEY (countryID) REFERENCES COUNTRIES(id)
);

CREATE TABLE INGREDIENT_BRAND (
	ingredientID int,
	brandID int,
	CONSTRAINT FOREIGN KEY (ingredientID) REFERENCES INGREDIENTS(id),
	CONSTRAINT FOREIGN KEY (brandID) REFERENCES BRANDS(id)
);

CREATE TABLE INGREDIENT_COUNTRY (
	ingredientID int,
	countryID int,
	CONSTRAINT FOREIGN KEY (ingredientID) REFERENCES INGREDIENTS(id),
	CONSTRAINT FOREIGN KEY (countryID) REFERENCES COUNTRIES(id)
);

CREATE TABLE BRAND_COUNTRY (
	brandID int,
	countryID int,
	CONSTRAINT FOREIGN KEY (brandID) REFERENCES BRANDS(id),
	CONSTRAINT FOREIGN KEY (countryID) REFERENCES COUNTRIES(id)
);
