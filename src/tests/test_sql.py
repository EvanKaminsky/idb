
# Unit Test Suite for sql.py

from backend import sql
import unittest


class SqlTest(unittest.TestCase):
    def test_fetchAll(self):
        cocktails = sql.sql_fetchAll("cocktails")
        ingredients = sql.sql_fetchAll("ingredients")
        brands = sql.sql_fetchAll("brands")
        countries = sql.sql_fetchAll("countries")

        self.assertTrue(type(cocktails) is list or type(cocktails) is tuple)
        self.assertTrue(type(ingredients) is list or type(ingredients) is tuple)
        self.assertTrue(type(brands) is list or type(brands) is tuple)
        self.assertTrue(type(countries) is list or type(countries) is tuple)

        self.assertTrue(len(cocktails) > 0)
        self.assertTrue(len(ingredients) > 0)
        self.assertTrue(len(brands) > 0)
        self.assertTrue(len(countries) > 0)

        self.assertTrue(sql.sql_select("*", "COCKTAILS") == cocktails)
        self.assertTrue(sql.sql_select("*", "INGREDIENTS") == ingredients)
        self.assertTrue(sql.sql_select("*", "BRANDS") == brands)
        self.assertTrue(sql.sql_select("*", "COUNTRIES") == countries)

    def test_returnType(self):
        cocktailNames = sql.sql_select("name", "COCKTAILS")
        self.assertTrue(type(cocktailNames) is list or type(cocktailNames) is tuple)
        firstCocktail = cocktailNames[0]
        self.assertTrue(type(firstCocktail) is dict)
        self.assertTrue("name" in firstCocktail)
        self.assertTrue("id" not in firstCocktail)

    def test_badQuery(self):
        noResult = sql.sql_select("label", "COCKTAILS")
        self.assertTrue(noResult is None)
        noResult = sql.sql_select("*", "FAKE_TABLE")
        self.assertTrue(noResult is None)

    # test uniqueness of ids
    def test_uniqueIDs(self):
        cocktailIDs = sql.sql_select("id", "COCKTAILS")
        for cocktail in cocktailIDs:
            for cocktail2 in cocktailIDs:
                if not cocktail is cocktail2:
                    self.assertTrue( cocktail["id"] != cocktail2["id"])

    # test uniqueness of stdame
    def test_uniquestdNames(self):
        ingredientstdnames = sql.sql_select("stdname", "INGREDIENTS")
        for ingredient in ingredientstdnames:
            for ingredient2 in ingredientstdnames:
                if not ingredient is ingredient2:
                    self.assertTrue(ingredient["stdname"] != ingredient2["stdname"])

    # test linking tables match up in the 2 directions
        # cocktail a -> ingredient b
        #    ==>
        # ingredient b -> cocktail a


if __name__ == '__main__':
    unittest.main()
