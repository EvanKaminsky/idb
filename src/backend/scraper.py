from urllib.request import urlopen
from bs4 import BeautifulSoup

# Dictionaries from models to id
brands_dict = {}
cocktails_dict = {}
countries_dict = {}
ingredients_dict = {}
brands_id = 1
cocktails_id = 1
countries_id = 1
ingredients_id = 1

# Matador Network for Countries and Drinks

source = "https://matadornetwork.com/nights/59-national-drinks-from-59-awesome-countries/"
page = urlopen(source)
soup = BeautifulSoup(page)

drinks = soup.find_all("h5")

cocktails_file = open('cocktails.txt', 'w')
countries_file = open('countries.txt', 'w')
cocktail_country_file = open('cocktail_country.txt', 'w')


for i in drinks:
    j = str(i)
    ind = j.find('.')
    ind2 = j.find('(')
    ind3 = j.find(')')

    '''
    print("DRINK")
    print(j[ind + 2 : ind2 - 1])
    print("COUNTRY")
    print(j[ind2 + 1 : ind3])
    '''

    cocktail_name = j[ind + 2 : ind2 - 1]
    country_name = j[ind2 + 1 : ind3]

    if country_name == 'Turkey':
        cocktail_name = 'Raki'

    cocktails_dict[cocktail_name] = str(cocktails_id)
    cocktails_id += 1
    cocktails_file.write(cocktails_dict[cocktail_name])
    cocktails_file.write(' ')
    cocktails_file.write(cocktail_name)
    cocktails_file.write('\n')

    countries_dict[country_name] = str(countries_id)
    countries_id += 1
    countries_file.write(countries_dict[country_name])
    countries_file.write(' ')
    countries_file.write(country_name)
    countries_file.write('\n')

    cocktail_country_file.write(cocktails_dict[cocktail_name])
    cocktail_country_file.write(' ')
    cocktail_country_file.write(countries_dict[country_name])
    cocktail_country_file.write('\n')

#cocktails_file.close()
countries_file.close()
cocktail_country_file.close()


# Barmano Cocktails source
# More cocktails in pagination if necessary

cocktails = "http://www.barmano.com/drinks/recipe-list/top/1/top-cocktails.html"
page = urlopen(cocktails)
soup = BeautifulSoup(page)

#print(soup.prettify())
tails = soup.find_all("div", class_="itemInfoContainer")
t = str.join(u'\n', map(str, tails))
#print(tails)
strings = t.split("</div>")

#cocktails_file = open('cocktails.txt', 'w')
ingredients_file = open('ingredients.txt', 'w')
cocktail_ingredient_file = open('cocktail_ingredient.txt', 'w')

for i in strings:
    #print(i)
    ind = i.find('title')
    ind2 = i.find('"', ind + 7)
    '''
    print("COCKTAIL")
    print(i[ind + 7 : ind2])
    print("INGREDIENTS")
    '''
    cocktail_name = i[ind + 7 : ind2]

    if cocktail_name not in cocktails_dict:
        cocktails_dict[cocktail_name] = str(cocktails_id)
        cocktails_id += 1
        cocktails_file.write(cocktails_dict[cocktail_name])
        cocktails_file.write(' ')
        cocktails_file.write(cocktail_name)
        cocktails_file.write('\n')

    ingreds = i.split('<li')

    for j in range(len(ingreds)):
        if j != 0:
            ind3 = ingreds[j].find('title')
            ind4 = ingreds[j].find('"', ind3 + 7)
            '''
            print(ingreds[j][ind3 + 7 : ind4])
            '''
            ingred_name = ingreds[j][ind3 + 7 : ind4]
            ingredients_dict[ingred_name] = str(ingredients_id)
            ingredients_id += 1
            ingredients_file.write(ingredients_dict[ingred_name])
            ingredients_file.write(' ')
            ingredients_file.write(ingred_name)
            ingredients_file.write('\n')
            cocktail_ingredient_file.write(cocktails_dict[cocktail_name])
            cocktail_ingredient_file.write(' ')
            cocktail_ingredient_file.write(ingredients_dict[ingred_name])
            cocktail_ingredient_file.write('\n')

cocktails_file.close()
#ingredients_file.close()
cocktail_ingredient_file.close()


# Business Insider Brands and Ingredients

site = "http://www.businessinsider.com/25-most-valuable-liquor-brands-2016-4/#no-23-old-parr-3"
page = urlopen(site)
soup = BeautifulSoup(page)

brands_file = open('brands.txt', 'w')
#ingredients_file = open('ingredients.txt', 'w')
ingredient_brand_file = open('ingredient_brand.txt', 'w')

brands = soup.find_all("h3", class_="slide-title")
ps = soup.find_all("p")
ingreds = []

for p in ps:
    j = str(p)
    if len(j) > 12:
        if j[3 : 12] == 'Category:':
            ind = j.find('</p>', 12)
            ingreds.append(j[13 : ind])

for i in range(len(brands)):
    j = str(brands[i])
    ind = j.find(':')
    ind2 = j.find('</h3>')
    '''
    print("BRAND")
    print(j[ind + 2 : ind2])
    print("INGREDIENT")
    print(ingreds[i])
    '''
    brand_name = j[ind + 2 : ind2]
    brands_dict[brand_name] = str(brands_id)
    brands_id += 1
    brands_file.write(brands_dict[brand_name])
    brands_file.write(' ')
    brands_file.write(brand_name)
    brands_file.write('\n')

    ingred_name = ingreds[i]

    if ingred_name not in ingredients_dict:
        ingredients_dict[ingred_name] = str(ingredients_id)
        ingredients_id += 1
        ingredients_file.write(ingredients_dict[ingred_name])
        ingredients_file.write(' ')
        ingredients_file.write(ingred_name)
        ingredients_file.write('\n')

    ingredient_brand_file.write(ingredients_dict[ingred_name])
    ingredient_brand_file.write(' ')
    ingredient_brand_file.write(brands_dict[brand_name])
    ingredient_brand_file.write('\n')

ingredients_file.close()
brands_file.close()
ingredient_brand_file.close()
