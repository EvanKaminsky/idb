import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class SampleTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(5)

    def test_search_in_python_org(self):
        driver = self.driver
        driver.get("http://www.python.org")
        self.assertIn("Python", driver.title)
        elem = driver.find_element_by_name("q")
        elem.send_keys("pycon")
        elem.send_keys(Keys.RETURN)
        assert "No results found." not in driver.page_source

    def tearDown(self):
        self.driver.close()


### Tests for the Homepage

class HomeTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(5)

    def test_title(self):
        driver = self.driver
        driver.get("http://tipsymix.com")
        html = list(driver.find_elements_by_tag_name("body"))[0].get_attribute('outerHTML')

        self.assertIn("Tipsy Mix", list(driver.find_elements_by_tag_name("h1"))[0].text)

    def tearDown(self):
        self.driver.close()


### Tests for the Cocktails List Page

class CocktailsTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(5)

    def test_title(self):
        driver = self.driver
        driver.get("http://tipsymix.com/cocktails")
        html = list(driver.find_elements_by_tag_name("body"))[0].get_attribute('outerHTML')

        self.assertIn("Tipsy Mix", list(driver.find_elements_by_tag_name("h1"))[0].text)

    def tearDown(self):
        self.driver.close()


### Tests for the Ingredients List Page

class IngredientsTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(5)

    def test_title(self):
        driver = self.driver
        driver.get("http://tipsymix.com/ingredients")
        html = list(driver.find_elements_by_tag_name("body"))[0].get_attribute('outerHTML')

        self.assertIn("Tipsy Mix", list(driver.find_elements_by_tag_name("h1"))[0].text)

    def tearDown(self):
        self.driver.close()


### Tests for the Brands List Page

class BrandsTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(5)

    def test_title(self):
        driver = self.driver
        driver.get("http://tipsymix.com/brands")
        html = list(driver.find_elements_by_tag_name("body"))[0].get_attribute('outerHTML')

        self.assertIn("Tipsy Mix", list(driver.find_elements_by_tag_name("h1"))[0].text)

    def tearDown(self):
        self.driver.close()


### Tests for the Countries List Page

class CountriesTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(5)

    def test_title(self):
        driver = self.driver
        driver.get("http://tipsymix.com/countries")
        html = list(driver.find_elements_by_tag_name("body"))[0].get_attribute('outerHTML')

        self.assertIn("Tipsy Mix", list(driver.find_elements_by_tag_name("h1"))[0].text)

    def tearDown(self):
        self.driver.close()


### Tests for detail pages

class DetailPageTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(5)

    def test_detailBox(self):
        driver = self.driver
        driver.get("http://tipsymix.com/cocktail-detail/1")
        html = list(driver.find_elements_by_tag_name("body"))[0].get_attribute('outerHTML')

        self.assertTrue(len(list(driver.find_elements_by_class_name("detail-box"))) > 0)

    def tearDown(self):
        self.driver.close()


### Tests for the About-Us Page

class AboutUsTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(5)

    def test_title(self):
        driver = self.driver
        driver.get("http://tipsymix.com/about")
        html = list(driver.find_elements_by_tag_name("body"))[0].get_attribute('outerHTML')

        self.assertIn("About", list(driver.find_elements_by_tag_name("h1"))[0].text)

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
