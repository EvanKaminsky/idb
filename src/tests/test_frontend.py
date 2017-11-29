import unittest
from sys import platform
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

#CHROME_PATH = '/usr/bin/google-chrome'
CHROMEDRIVER_PATH = '/usr/local/bin/chromedriver'
WINDOW_SIZE = "1920,1080"

def createWebdriver():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)

    try:
        # if we defined a custom path
        chrome_options.binary_location = CHROME_PATH
    except NameError:
        pass

    if platform == "win32":
        driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH, chrome_options=chrome_options)
    else:
        driver = webdriver.Chrome(chrome_options=chrome_options)

    return driver


class SampleTest(unittest.TestCase):

    def setUp(self):
        self.driver = createWebdriver()
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
        self.driver = createWebdriver()
        self.driver.implicitly_wait(5)

    def test_title(self):
        driver = self.driver
        driver.get("http://tipsymix.com")
        html = list(driver.find_elements_by_tag_name("body"))[0].get_attribute('outerHTML')

        self.assertIn("Tipsy Mix", list(driver.find_elements_by_tag_name("h1"))[0].text)

    def test_search_navigation(self):
        driver = self.driver
        driver.get("http://tipsymix.com")
        html = list(driver.find_elements_by_tag_name("body"))[0].get_attribute('outerHTML')
        searchButton = list(driver.find_elements_by_class_name("search"))[0]
        prevUrl = driver.current_url
        searchButton.send_keys(Keys.RETURN)
        self.assertTrue(driver.current_url == prevUrl)

        html = list(driver.find_elements_by_tag_name("body"))[0].get_attribute('outerHTML')
        searchButton = list(driver.find_elements_by_class_name("search"))[0]
        prevUrl = driver.current_url
        searchButton.click()
        self.assertTrue(driver.current_url != prevUrl)

    def tearDown(self):
        self.driver.close()


### Tests for the Cocktails List Page

class CocktailsTest(unittest.TestCase):

    def setUp(self):
        self.driver = createWebdriver()
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
        self.driver = createWebdriver()
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
        self.driver = createWebdriver()
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
        self.driver = createWebdriver()
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
        self.driver = createWebdriver()
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
        self.driver = createWebdriver()
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
