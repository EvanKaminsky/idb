import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from itertools import islice

# Fill this out
engine_internal = create_engine("mysql+mysqlconnector://%s:%s@%s/%s"
     % ("youruser", "yourpassword", "yourhostname.com:3306",
     "yourdatabasename"),
     pool_size=3, pool_recycle=3600)

Internal = sessionmaker(bind=engine_internal)

c = Internal()

color_const = 255

with open('brands.txt') as br:
    while True:
        s = list(islice(br, 6))
        s[0] = int(s[0])
        s.insert(4, color_const)
        c.execute('INSERT INTO BRANDS values (?, ?, ?, ?, ?, ?, ?)', s)
        if not s:
            break

with open('cocktails.txt') as co:
    while True:
        s = list(islice(co, 6))
        s[0] = int(s[0])
        s.insert(4, color_const)
        c.execute('INSERT INTO COCKTAILS values (?, ?, ?, ?, ?, ?, ?)', s)
        if not s:
            break

with open('countries.txt') as cu:
    while True:
        s = list(islice(cu, 6))
        s[0] = int(s[0])
        s.insert(4, color_const)
        c.execute('INSERT INTO COUNTRIES values (?, ?, ?, ?, ?, ?, ?)', s)
        if not s:
            break

with open('ingredients.txt') as ig:
    while True:
        s = list(islice(br, 6))
        s[0] = int(s[0])
        s.insert(4, color_const)
        c.execute('INSERT INTO INGREDIENTS values (?, ?, ?, ?, ?, ?, ?)', s)
        if not s:
            break

with open('cocktail_country.txt') as cc:
    for line5 in cc:
        s = line5.split(' ')
        a = [int(s[0]), int(s[1])]
        c.execute('INSERT INTO COCKTAIL_COUNTRY values (?, ?)', a)

with open('cocktail_ingredient.txt') as cc:
    for line6 in cc:
        s = line6.split(' ')
        a = [int(s[0]), int(s[1])]
        c.execute('INSERT INTO COCKTAIL_INGREDIENT values (?, ?)', a)

with open('ingredient_brand.txt') as cc:
    for line7 in cc:
        s = line7.split(' ')
        a = [int(s[0]), int(s[1])]
        c.execute('INSERT INTO INGREDIENT_BRAND values (?, ?)', a)

with open('brand_country.txt') as cc:
    for line8 in cc:
        s = line8.split(' ')
        a = [int(s[0]), int(s[1])]
        c.execute('INSERT INTO BRAND_COUNTRY values (?, ?)', a)

c.commit()
c.close()
