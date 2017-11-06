import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from itertools import islice
import mysql.connector
import unicodedata
import string

printable = set(string.printable)

#c = Internal()
cnx = mysql.connector.connect(user='root', password='tipsymix',
                              host='127.0.0.1',
                              database='tipsy_backend')
c = cnx.cursor()
dbScript = ""
with open("db.sql", "r") as file:
    dbScript = file.read()

sqlCommands = dbScript.split(';')
for command in sqlCommands:
    try:
        if command.strip() != '':
            c.execute(command)
    except IOError, msg:
        print "Command skipped: ", msg
print("db wiped")

color_const = 255

with open('brands.txt') as br:
    while True:
        s = list(islice(br, 6))
        if not s:
            break
        s[0] = int(s[0])
        s.insert(4, color_const)
        c.execute('INSERT INTO BRANDS values (%s, %s, %s, %s, %s, %s, %s)', tuple(map(lambda t: filter(lambda x: x in printable, str(t).strip()), s)))
    print("brands inserted")


with open('cocktails.txt') as co:
    while True:
        s = list(islice(co, 6))
        if not s:
            break
        s[0] = int(s[0])
        s.insert(4, color_const)
        c.execute('INSERT INTO COCKTAILS values (%s, %s, %s, %s, %s, %s, %s)', tuple(map(lambda t: filter(lambda x: x in printable, str(t).strip()), s)))
    print("cocktails inserted")


with open('countries.txt') as cu:
    while True:
        s = list(islice(cu, 6))
        if not s:
            break
        s[0] = int(s[0])
        s.insert(4, color_const)
        c.execute('INSERT INTO COUNTRIES values (%s, %s, %s, %s, %s, %s, %s)', tuple(map(lambda t: filter(lambda x: x in printable, str(t).strip()), s)))
    print("countries inserted")


with open('ingredients.txt') as ig:
    while True:
        s = list(islice(ig, 6))
        if not s:
            break
        s[0] = int(s[0])
        s.insert(4, color_const)
        if s[6].strip() == 'NULL':
            s[6] = 0
        c.execute('INSERT INTO INGREDIENTS values (%s, %s, %s, %s, %s, %s, %s)', tuple(map(lambda t: filter(lambda x: x in printable, str(t).strip()), s)))
    print("ingredients inserted")


with open('cocktail_country.txt') as cc:
    for line5 in cc:
        s = line5.split(' ')
        a = [int(s[0].strip()), int(s[1].strip())]
        c.execute('INSERT INTO COCKTAIL_COUNTRY values (%s, %s)', a)

with open('cocktail_ingredient.txt') as cc:
    for line6 in cc:
        s = line6.split(' ')
        a = [int(s[0].strip()), int(s[1].strip())]
        c.execute('INSERT INTO COCKTAIL_INGREDIENT values (%s, %s)', a)

with open('ingredient_brand.txt') as cc:
    for line7 in cc:
        s = line7.split(' ')
        a = [int(s[0].strip()), int(s[1].strip())]
        c.execute('INSERT INTO INGREDIENT_BRAND values (%s, %s)', a)

with open('brand_country.txt') as cc:
    for line8 in cc:
        s = line8.split(' ')
        a = [int(s[0].strip()), int(s[1].strip())]
        c.execute('INSERT INTO BRAND_COUNTRY values (%s, %s)', a)

print("links created")

c.close()
cnx.commit()
cnx.close()

print("done")
