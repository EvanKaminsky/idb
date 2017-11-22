
# Unit Test Suite for engine.py

from backend import engine
from backend import sql
import unittest

CONNECTED = sql.sql_test()

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

        blankSearch = engine.runSearch()
        self.assertTrue(type(blankSearch) is dict)
        self.assertTrue("results" in blankSearch)
        self.assertTrue(type(blankSearch["results"]) is list)
        self.assertTrue(len(blankSearch["results"]) == blankSearch["count"])
        self.assertTrue(blankSearch["totalCount"] >= blankSearch["count"])
        self.assertTrue(blankSearch["page"] > 0)

    # test that query finds relevant results
    # test pagination
    # test sorting


if __name__ == '__main__':
    unittest.main()
