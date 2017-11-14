cd src
rm -rf tests/coverage/*
mkdir -p tests/coverage
cp -rf tests/*.py tests/coverage
cp -rf backend/* tests/coverage
cd tests/coverage
sed -i -e 's/from backend //g' *.py
coverage2 run --omit=/usr/* --include=./*.py runTests.py || coverage run --omit=/usr/* --include=./*.py runTests.py
coverage2 html || coverage html
coverage2 report -m || coverage report -m
open ./htmlcov/index.html || xdg-open ./htmlcov/index.html