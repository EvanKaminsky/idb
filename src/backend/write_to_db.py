import sqlite3

conn = sqlite3.connect('example.db')

c = conn.cursor()

with open('brands.txt') as br:
    for line1 in br:
        s = line1.split(' ')
        a = [int(s[0]), s[1].lower(), s[1]]
        c.execute('INSERT INTO BRANDS values (?, ?, ?)', a)

with open('cocktails.txt') as co:
    for line2 in co:
        s = line2.split(' ')
        a = [int(s[0]), s[1].lower(), s[1]]
        c.execute('INSERT INTO BRANDS values (?, ?, ?)', a)

with open('countries.txt') as cu:
    for line3 in cu:
        s = line3.split(' ')
        a = [int(s[0]), s[1].lower(), s[1]]
        c.execute('INSERT INTO BRANDS values (?, ?, ?)', a)

with open('brands.txt') as ig:
    for line4 in ig:
        s = line4.split(' ')
        a = [int(s[0]), s[1].lower(), s[1]]
        c.execute('INSERT INTO BRANDS values (?, ?, ?)', a)

with open('cocktail_country.txt') as cc:
    for line5 in cc:
        s = line5.split(' ')
        a = [int(s[0]), int(s[1])]
        c.execute('INSERT INTO COCKTAIL_COUNTRY values (?, ?)', a)

with open('cocktail_ingredient.txt') as cc:
    for line5 in cc:
        s = line5.split(' ')
        a = [int(s[0]), int(s[1])]
        c.execute('INSERT INTO COCKTAIL_INGREDIENT values (?, ?)', a)

with open('ingredient_brand.txt') as cc:
    for line5 in cc:
        s = line5.split(' ')
        a = [int(s[0]), int(s[1])]
        c.execute('INSERT INTO INGREDIENT_BRAND values (?, ?)', a)
