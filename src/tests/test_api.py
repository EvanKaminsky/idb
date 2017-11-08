
# Unit Test Suite for api.py

from backend import api
import unittest


class APITest(unittest.TestCase):
    def test_api(self):
        self.assertTrue(len(api.search(query="mint", category="cocktail")) > 0)

    def test_helper(self):
        pass


if __name__ == '__main__':
    unittest.main()
