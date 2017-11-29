import unittest
from sys import platform
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from contextlib import contextmanager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.expected_conditions import staleness_of

#CHROME_PATH = '/usr/bin/google-chrome'
CHROMEDRIVER_PATH = '/usr/local/bin/chromedriver'
WINDOW_SIZE = "1920,1080"

def createWebdriver():
    chrome_options = webdriver.ChromeOptions()
    #chrome_options.add_argument("--headless")
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

@contextmanager
def wait_for_page_load(driver, timeout=5):
    old_page = driver.find_element_by_tag_name('html')
    yield
    WebDriverWait(driver, timeout).until(staleness_of(old_page))


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


# General Tests
def test_navbar(tester):
    driver = tester.driver
    driver.get(tester.url)
    html = list(driver.find_elements_by_tag_name("body"))[0].get_attribute('outerHTML')

    tabs = list(driver.find_elements_by_tag_name("li"))
    tester.assertIn("Home", tabs[0].get_attribute("outerHTML"))
    tester.assertIn("Cocktails", tabs[1].get_attribute("outerHTML"))
    tester.assertIn("Ingredients", tabs[2].get_attribute("outerHTML"))
    tester.assertIn("Brands", tabs[3].get_attribute("outerHTML"))
    tester.assertIn("Countries", tabs[4].get_attribute("outerHTML"))
    tester.assertIn("About", tabs[5].get_attribute("outerHTML"))

    tester.assertTrue(tabs[tester.nav_index].get_attribute("class") == "active")

def test_title(tester, title="Tipsy Mix"):
    driver = tester.driver
    driver.get(tester.url)
    html = list(driver.find_elements_by_tag_name("body"))[0].get_attribute('outerHTML')
    tester.assertIn(title, list(driver.find_elements_by_tag_name("h1"))[0].text)


### Tests for the Homepage
class HomeTest(unittest.TestCase):

    def setUp(self):
        self.url = "http://tipsymix.com"
        self.nav_index = 0
        self.driver = createWebdriver()
        self.driver.implicitly_wait(5)

    def test_title(self):
        test_title(self)

    def test_active_tab(self):
        test_navbar(self)

    def test_search_navigation(self):
        driver = self.driver
        driver.get(self.url)

        html = list(driver.find_elements_by_tag_name("body"))[0].get_attribute('outerHTML')
        searchButton = list(driver.find_elements_by_class_name("TipsyButton-button-1"))[0]
        prevUrl = driver.current_url
        searchButton.send_keys(Keys.RETURN)
        timeout = 5
        try:
            element_present = EC.presence_of_element_located((By.ID, 'grid'))
            WebDriverWait(driver, timeout).until(element_present)
            self.assertTrue(True)
        except TimeoutException:
            self.assertTrue(False)

        driver.get(self.url)

        html = list(driver.find_elements_by_tag_name("body"))[0].get_attribute('outerHTML')
        searchButton = list(driver.find_elements_by_class_name("TipsyButton-button-1"))[0]
        prevUrl = driver.current_url
        searchButton.click()

        timeout = 5
        try:
            element_present = EC.presence_of_element_located((By.ID, 'grid'))
            WebDriverWait(driver, timeout).until(element_present)
        except TimeoutException:
            self.assertTrue(False)
        self.assertTrue(driver.current_url != prevUrl)

    def tearDown(self):
        self.driver.close()


### Tests for the Cocktails List Page

class CocktailsTest(unittest.TestCase):

    def setUp(self):
        self.url = "http://tipsymix.com/cocktails"
        self.nav_index = 1
        self.driver = createWebdriver()
        self.driver.implicitly_wait(5)

    def test_title(self):
        test_title(self)

    def test_active_tab(self):
        test_navbar(self)

    def tearDown(self):
        self.driver.close()


### Tests for the Ingredients List Page

class IngredientsTest(unittest.TestCase):

    def setUp(self):
        self.url = "http://tipsymix.com/ingredients"
        self.nav_index = 2
        self.driver = createWebdriver()
        self.driver.implicitly_wait(5)

    def test_title(self):
        test_title(self)

    def test_active_tab(self):
        test_navbar(self)

    def tearDown(self):
        self.driver.close()


### Tests for the Brands List Page
class BrandsTest(unittest.TestCase):

    def setUp(self):
        self.url = "http://tipsymix.com/brands"
        self.nav_index = 3
        self.driver = createWebdriver()
        self.driver.implicitly_wait(5)

    def test_title(self):
        test_title(self)

    def test_active_tab(self):
        test_navbar(self)

    def tearDown(self):
        self.driver.close()


### Tests for the Countries List Page
class CountriesTest(unittest.TestCase):

    def setUp(self):
        self.url = "http://tipsymix.com/countries"
        self.nav_index = 4
        self.driver = createWebdriver()
        self.driver.implicitly_wait(5)

    def test_title(self):
        test_title(self)

    def test_active_tab(self):
        test_navbar(self)

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
        self.url = "http://tipsymix.com/about"
        self.nav_index = 5
        self.driver = createWebdriver()
        self.driver.implicitly_wait(5)

    def test_title(self):
        test_title(self, title="About")

    def test_active_tab(self):
        test_navbar(self)

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
