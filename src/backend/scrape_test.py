from urllib.request import urlopen
from bs4 import BeautifulSoup

source = "https://www.countries-ofthe-world.com/flags-of-the-world.html"
page = urlopen(source)
soup = BeautifulSoup(page)

print(soup.prettify())