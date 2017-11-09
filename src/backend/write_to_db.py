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
from sql import sql_fetchAll

from PIL import Image
import urllib
import cStringIO

from whoosh.fields import *
from whoosh.index import *

from engine import schema
from engine import COCKTAIL_INDEX_PATH
from engine import INGREDIENT_INDEX_PATH
from engine import BRAND_INDEX_PATH
from engine import COUNTRY_INDEX_PATH

DEFAULT_COLOR = 255

# Infers a color for a card based on an image url

def inferColor(imageurl):
    fileio = cStringIO.StringIO(urllib.urlopen(imageurl).read())

    try:
        img = Image.open(fileio)
        r, g, b = get_average_color(img)
    except Exception as e:
        print e
        return DEFAULT_COLOR
    return ((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF)


# Returns a 3-tuple of the average R, G, and B values in the given PIL image

def get_average_color(image):
    r, g, b = 0, 0, 0
    count = 1
    for s in list(image.getdata()):
        pixlr, pixlg, pixlb = s[:3]
        r += pixlr
        g += pixlg
        b += pixlb
        count += 1
    return ((r // count), (g // count), (b // count))

def main():
    printable = set(string.printable)

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

    with open('brands.txt') as br:
        while True:
            s = list(islice(br, 8))
            if not s:
                break
            s[0] = int(s[0])
            s.insert(4, DEFAULT_COLOR)
            c.execute('INSERT INTO BRANDS values (%s, %s, %s, %s, %s, %s, %s, %s, %s)', tuple(map(lambda t: filter(lambda x: x in printable, str(t).strip()), s)))
        print("brands inserted")

    with open('cocktails.txt') as co:
        while True:
            s = list(islice(co, 7))
            if not s:
                break
            s[0] = int(s[0])
            s.insert(4, DEFAULT_COLOR)
            c.execute('INSERT INTO COCKTAILS values (%s, %s, %s, %s, %s, %s, %s, %s)', tuple(map(lambda t: filter(lambda x: x in printable, str(t).strip()), s)))
        print("cocktails inserted")

    with open('countries.txt') as cu:
        while True:
            s = list(islice(cu, 8))
            if not s:
                break
            s[0] = int(s[0])
            s.insert(4, DEFAULT_COLOR)
            c.execute('INSERT INTO COUNTRIES values (%s, %s, %s, %s, %s, %s, %s, %s, %s)', tuple(map(lambda t: filter(lambda x: x in printable, str(t).strip()), s)))
        print("countries inserted")

    with open('ingredients.txt') as ig:
        while True:
            s = list(islice(ig, 7))
            if not s:
                break
            s[0] = int(s[0])
            s.insert(4, DEFAULT_COLOR)
            if s[6].strip() == 'NULL':
                s[6] = 0
            c.execute('INSERT INTO INGREDIENTS values (%s, %s, %s, %s, %s, %s, %s, %s)', tuple(map(lambda t: filter(lambda x: x in printable, str(t).strip()), s)))
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

    with open('tags.txt') as cc:
        for line9 in cc:
            s = line9.split(' ')
            s[0] = int(s[0])
            c.execute('INSERT INTO TAGS values (%s, %s)', tuple(map(lambda t: filter(lambda x: x in printable, str(t).strip()), s)))

    with open('brand_tags.txt') as cc:
        for line10 in cc:
            s = line10.split(' ')
            a = [int(s[0].strip()), int(s[1].strip())]
            c.execute('INSERT INTO BRAND_TAGS values (%s, %s)', a)

    with open('cocktail_tags.txt') as cc:
        for line11 in cc:
            s = line11.split(' ')
            a = [int(s[0].strip()), int(s[1].strip())]
            c.execute('INSERT INTO COCKTAIL_TAGS values (%s, %s)', a)

    with open('country_tags.txt') as cc:
        for line12 in cc:
            s = line12.split(' ')
            a = [int(s[0].strip()), int(s[1].strip())]
            c.execute('INSERT INTO COUNTRY_TAGS values (%s, %s)', a)

    with open('ingredient_tags.txt') as cc:
        for line13 in cc:
            s = line13.split(' ')
            a = [int(s[0].strip()), int(s[1].strip())]
            c.execute('INSERT INTO INGREDIENT_TAGS values (%s, %s)', a)

    print("links created")

    c.close()
    cnx.commit()
    cnx.close()

    ##########################################
    ######  Create Whoosh Lucene Index  ######
    ##########################################

    if not os.path.exists(COCKTAIL_INDEX_PATH):
        os.mkdir(COCKTAIL_INDEX_PATH)
    ixCocktail = create_in(COCKTAIL_INDEX_PATH, schema)
    if not os.path.exists(INGREDIENT_INDEX_PATH):
        os.mkdir(INGREDIENT_INDEX_PATH)
    ixIng = create_in(INGREDIENT_INDEX_PATH, schema)
    if not os.path.exists(BRAND_INDEX_PATH):
        os.mkdir(BRAND_INDEX_PATH)
    ixBr = create_in(BRAND_INDEX_PATH, schema)
    if not os.path.exists(COUNTRY_INDEX_PATH):
        os.mkdir(COUNTRY_INDEX_PATH)
    ixCo = create_in(COUNTRY_INDEX_PATH, schema)

    cocktailData = sql_fetchAll("COCKTAILS")
    ingData = sql_fetchAll("INGREDIENTS")
    brData = sql_fetchAll("BRANDS")
    coData = sql_fetchAll("COUNTRIES")

    writer = ixCocktail.writer()
    for data in cocktailData:
        writer.add_document(title=data.get("name").decode('utf-8'), id=str(data.get("id")).decode('utf-8'), body=data.get("description").decode('utf-8'))
    writer.commit()

    writer = ixIng.writer()
    for data in ingData:
        writer.add_document(title=data.get("name").decode('utf-8'), id=str(data.get("id")).decode('utf-8'), body=data.get("description").decode('utf-8'))
    writer.commit()

    writer = ixBr.writer()
    for data in brData:
        writer.add_document(title=data.get("name").decode('utf-8'), id=str(data.get("id")).decode('utf-8'), body=data.get("description").decode('utf-8'))
    writer.commit()

    writer = ixCo.writer()
    for data in coData:
        writer.add_document(title=data.get("name").decode('utf-8'), id=str(data.get("id")).decode('utf-8'), body=data.get("description").decode('utf-8'))
    writer.commit()

    print("done")


if __name__ == '__main__':
    main()
