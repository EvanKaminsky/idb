
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
	FOREIGN KEY (cocktailID) REFERENCES COCKTAILS(id),
	FOREIGN KEY (tagID) REFERENCES TAGS(id)
);

CREATE TABLE INGREDIENT_TAGS (
	ingredientID int NOT NULL,
	tagID int NOT NULL,
	FOREIGN KEY (ingredientID) REFERENCES INGREDIENTS(id),
	FOREIGN KEY (tagID) REFERENCES TAGS(id)
);

CREATE TABLE BRAND_TAGS (
	brandID int NOT NULL,
	tagID int NOT NULL,
	FOREIGN KEY (brandID) REFERENCES BRANDS(id),
	FOREIGN KEY (tagID) REFERENCES TAGS(id)
);

CREATE TABLE COUNTRY_TAGS (
	countryID int NOT NULL,
	tagID int NOT NULL,
	FOREIGN KEY (countryID) REFERENCES COUNTRIES(id),
	FOREIGN KEY (tagID) REFERENCES TAGS(id)
);

CREATE TABLE COCKTAIL_INGREDIENT (
	cocktailID int,
	ingredientID int,
	FOREIGN KEY (cocktailID) REFERENCES COCKTAILS(id),
	FOREIGN KEY (ingredientID) REFERENCES INGREDIENTS(id)
);

CREATE TABLE COCKTAIL_BRAND (
	cocktailID int,
	brandID int,
	FOREIGN KEY (cocktailID) REFERENCES COCKTAILS(id),
	FOREIGN KEY (brandID) REFERENCES BRANDS(id)
);

CREATE TABLE COCKTAIL_COUNTRY (
	cocktailID int,
	countryID int,
	FOREIGN KEY (cocktailID) REFERENCES COCKTAILS(id),
	FOREIGN KEY (countryID) REFERENCES COUNTRIES(id)
);

CREATE TABLE INGREDIENT_BRAND (
	ingredientID int,
	brandID int,
	FOREIGN KEY (ingredientID) REFERENCES INGREDIENTS(id),
	FOREIGN KEY (brandID) REFERENCES BRANDS(id)
);

CREATE TABLE INGREDIENT_COUNTRY (
	ingredientID int,
	countryID int,
	FOREIGN KEY (ingredientID) REFERENCES INGREDIENTS(id),
	FOREIGN KEY (countryID) REFERENCES COUNTRIES(id)
);

CREATE TABLE BRAND_COUNTRY (
	brandID int,
	countryID int,
	FOREIGN KEY (brandID) REFERENCES BRANDS(id),
	FOREIGN KEY (countryID) REFERENCES COUNTRIES(id)
);
