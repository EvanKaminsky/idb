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

# Fill this out
#engine_internal = create_engine('mysql+mysqldb://root:tipsymix@/tipsy_backend?unix_socket=/cloudsql/tipsymix-ttp:tipsy-db')
engine_internal = create_engine("mysql+mysqlconnector://%s:%s@%s/%s"
     % ("youruser", "yourpassword", "yourhostname.com:3306",
     "yourdatabasename"),
     pool_size=3, pool_recycle=3600)

#Internal = sessionmaker(bind=engine_internal)

#c = Internal()
cnx = mysql.connector.connect(user='root', password='tipsymix',
                              host='127.0.0.1',
                              database='tipsy_backend')
c = cnx.cursor()

color_const = 255

with open('brands.txt') as br:
    while True:
        s = list(islice(br, 6))
        if not s:
            break
        s[0] = int(s[0])
        s.insert(4, color_const)
        c.execute('INSERT INTO BRANDS values (%s, %s, %s, %s, %s, %s, %s)', tuple(map(lambda t: filter(lambda x: x in printable, str(t).strip()), s)))
        

with open('cocktails.txt') as co:
    while True:
        s = list(islice(co, 6))
        if not s:
            break
        s[0] = int(s[0])
        s.insert(4, color_const)
        c.execute('INSERT INTO COCKTAILS values (%s, %s, %s, %s, %s, %s, %s)', tuple(map(lambda t: filter(lambda x: x in printable, str(t).strip()), s)))
        

with open('countries.txt') as cu:
    while True:
        s = list(islice(cu, 6))
        if not s:
            break
        s[0] = int(s[0])
        s.insert(4, color_const)
        c.execute('INSERT INTO COUNTRIES values (%s, %s, %s, %s, %s, %s, %s)', tuple(map(lambda t: filter(lambda x: x in printable, str(t).strip()), s)))
        

with open('ingredients.txt') as ig:
    while True:
<<<<<<< HEAD
        s = list(islice(ig, 6))
=======
        s = list(islice(br, 6))
        s[0] = int(s[0])
        s.insert(4, color_const)
        s[6] = int(s[6])
        c.execute('INSERT INTO INGREDIENTS values (?, ?, ?, ?, ?, ?, ?)', s)
>>>>>>> 04ec4ac913c267fd23849f353ae52024968e1d66
        if not s:
            break
        s[0] = int(s[0])
        s.insert(4, color_const)
        if s[6].strip() == 'NULL':
            s[6] = 0
        c.execute('INSERT INTO INGREDIENTS values (%s, %s, %s, %s, %s, %s, %s)', tuple(map(lambda t: filter(lambda x: x in printable, str(t).strip()), s)))
        

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

c.close()
cnx.commit()
cnx.close()
