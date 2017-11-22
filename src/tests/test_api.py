
# Unit Test Suite for api.py

from backend import api
from backend import sql
import unittest

CONNECTED = sql.sql_test()

class APITest(unittest.TestCase):

    @unittest.skipIf(not CONNECTED, "Not Connected to Database")
    def test_api(self):
        self.assertTrue(len(api.search(query="mint", category="cocktail")) > 0)

    def test_fixCategory(self):
        self.assertEquals(api.fixCategory(None), None)
        self.assertEquals(api.fixCategory("coUnTry"), "COUNTRIES")
        self.assertEquals(api.fixCategory("cockTAILs"), "COCKTAILS")
        self.assertEquals(api.fixCategory("IngredieNt"), "INGREDIENTS")
        self.assertEquals(api.fixCategory("braNd"), "BRANDS")

    @unittest.skipIf(not CONNECTED, "Not Connected to Database")
    def test_countryDetail(self):
        country1 = api.countryDetail(1)
        country1Again = api.countryDetail(1)
        self.assertTrue(country1 == country1Again)

        country5 = api.countryDetail(5)
        self.assertTrue(len(country5["stdname"]) >= 0)
        self.assertTrue(len(country5["summary"]) >= 0)
        self.assertTrue(len(country5["description"]) >= 0)
        self.assertTrue(len(country5["capital"]) >= 0)
        self.assertTrue(len(country5["continent"]) >= 0)
        self.assertFalse(country5["brands"] is None)
        self.assertFalse(country5["cocktails"] is None)
        self.assertFalse(country5["ingredients"] is None)

    @unittest.skipIf(not CONNECTED, "Not Connected to Database")
    def test_cocktailDetail(self):
        cocktail1 = api.cocktailDetail(1)
        cocktail1Again = api.cocktailDetail(1)
        self.assertTrue(cocktail1 == cocktail1Again)

        cocktail5 = api.cocktailDetail(5)
        self.assertTrue(len(cocktail5["stdname"]) >= 0)
        self.assertTrue(len(cocktail5["summary"]) >= 0)
        self.assertTrue(len(cocktail5["description"]) >= 0)
        self.assertIsInstance(cocktail5["abv"], float)
        self.assertFalse(cocktail5["glass"] is None)
        self.assertFalse(cocktail5["garnish"] is None)
        self.assertFalse(cocktail5["video"] is None)
        self.assertFalse(cocktail5["image"] is None)
        self.assertFalse(cocktail5["brands"] is None)
        self.assertFalse(cocktail5["countries"] is None)
        self.assertFalse(cocktail5["ingredients"] is None)

    @unittest.skipIf(not CONNECTED, "Not Connected to Database")
    def test_ingredientDetail(self):
        ingredient1 = api.ingredientDetail(1)
        ingredient1Again = api.ingredientDetail(1)
        self.assertTrue(ingredient1 == ingredient1Again)

        ingredient5 = api.ingredientDetail(5)
        self.assertTrue(len(ingredient5["stdname"]) >= 0)
        self.assertTrue(len(ingredient5["summary"]) >= 0)
        self.assertTrue(len(ingredient5["description"]) >= 0)
        self.assertIsInstance(ingredient5["abv"], float)
        self.assertFalse(ingredient5["brands"] is None)
        self.assertFalse(ingredient5["cocktails"] is None)
        self.assertFalse(ingredient5["countries"] is None)

    @unittest.skipIf(not CONNECTED, "Not Connected to Database")
    def test_brandDetail(self):
        brand1 = api.brandDetail(1)
        brand1Again = api.brandDetail(1)
        self.assertTrue(brand1 == brand1Again)

        brand5 = api.brandDetail(5)
        self.assertTrue(len(brand5["stdname"]) >= 0)
        self.assertTrue(len(brand5["summary"]) >= 0)
        self.assertTrue(len(brand5["description"]) >= 0)
        self.assertFalse(brand5["value"] is None)
        self.assertFalse(brand5["countries"] is None)
        self.assertFalse(brand5["cocktails"] is None)
        self.assertFalse(brand5["ingredients"] is None)

    @unittest.skipIf(not CONNECTED, "Not Connected to Database")
    def test_describe(self):
        description_response = api.describe()
        self.assertFalse(description_response["cocktail_fields"] is None)
        self.assertFalse(description_response["country_fields"] is None)
        self.assertFalse(description_response["brand_fields"] is None)
        self.assertFalse(description_response["ingredient_fields"] is None)
        self.assertFalse(len(description_response["cocktail_fields"]) == 0)


if __name__ == '__main__':
    unittest.main()
