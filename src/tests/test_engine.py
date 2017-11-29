
# Unit Test Suite for engine.py

from backend import engine
from backend import sql
import unittest

class EngineTest(unittest.TestCase):
    def test_default(self):
        default = engine.inferCategory()
        self.assertTrue(default is not None)
        self.assertTrue(default == "COCKTAILS" or default == "INGREDIENTS" or default == "BRANDS" or default == "COUNTRIES")

    def test_inferCategory(self):
        self.assertTrue(engine.inferCategory("COCKTAILS") == "COCKTAILS")
        self.assertTrue(engine.inferCategory("INGREDIENTS") == "INGREDIENTS")
        self.assertTrue(engine.inferCategory("BRANDS") == "BRANDS")
        self.assertTrue(engine.inferCategory("COUNTRIES") == "COUNTRIES")

    @unittest.skipIf(not sql.sql_test(), "Not Connected to Database")
    def test_blankSearch(self):
        blankSearch = engine.runSearch()
        self.assertTrue(type(blankSearch) is dict)
        self.assertTrue("results" in blankSearch)
        self.assertTrue(type(blankSearch["results"]) is list)
        self.assertTrue(len(blankSearch["results"]) == blankSearch["count"])
        self.assertTrue(blankSearch["totalCount"] >= blankSearch["count"])
        self.assertTrue(blankSearch["page"] > 0)

    # test that query finds relevant results
    @unittest.skipIf(not sql.sql_test(), "Not Connected to Database")
    def test_queryRelevantResults(self):
        testSearch = engine.runSearch(query="cocktail")
        self.assertTrue(type(testSearch) is dict)
        self.assertTrue("results" in testSearch)
        self.assertTrue(len(testSearch["results"]) > 0)
        self.assertTrue(testSearch["category"] == "COCKTAILS")


    # test pagination
    @unittest.skipIf(not sql.sql_test(), "Not Connected to Database")
    def test_pagination(self):
        testSearch = engine.runSearch(query="cocktail", page=1, pageSize=5)
        self.assertEqual(len(testSearch["results"]), 5)
        testSearchP2 = engine.runSearch(query="cocktail", page=2, pageSize=5)
        self.assertNotEqual(testSearch["results"][0], testSearchP2["results"][0])
        self.assertNotIn(testSearch["results"][0], testSearchP2["results"])

    # test sorting
    @unittest.skipIf(not sql.sql_test(), "Not Connected to Database")
    def test_sorting(self):
        testSearch = engine.runSearch(query="cocktail")
        sorted = engine.applySort(testSearch["results"], "[name][a]")
        self.assertLessEqual(sorted[0]["name"], sorted[1]["name"])
        self.assertLessEqual(sorted[0]["name"], sorted[len(sorted) - 1]["name"])
        self.assertLessEqual(sorted[1]["name"], sorted[2]["name"])

    unittest.skipIf(not sql.sql_test(), "Not Connected to Database")
    def test_sortingReverse(self):
        testSearch = engine.runSearch(query="cocktail")
        sortedReverse = engine.applySort(testSearch["results"], "[name][d]")
        self.assertLessEqual(sortedReverse[1]["name"], sortedReverse[0]["name"])
        self.assertLessEqual(sortedReverse[len(sortedReverse) - 1]["name"], sortedReverse[0]["name"])
        self.assertLessEqual(sortedReverse[2]["name"], sortedReverse[1]["name"])

if __name__ == '__main__':
    unittest.main()
