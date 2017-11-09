import math
from textblob import TextBlob as tb
from itertools import islice

def tf(word, blob):
    return blob.words.count(word) / len(blob.words)

def n_containing(word, bloblist):
    return sum(1 for blob in bloblist if word in blob.words)

def idf(word, bloblist):
    return math.log(len(bloblist) / (1 + n_containing(word, bloblist)))

def tfidf(word, blob, bloblist):
    return tf(word, blob) * idf(word, bloblist)


tags_file = open('tags.txt', 'w')
tags_id = 1

bloblist = []
idlist = []

with open('brands.txt') as br:
    while True:
        s = list(islice(br, 8))
        if not s:
            break
        idlist.append(int(s[0]))
        bloblist.append(tb(s[4].lower()))
    br.close()

brt = open('brand_tags.txt', 'w')

for i, blob in enumerate(bloblist):
    scores = {word: tfidf(word, blob, bloblist) for word in blob.words}
    sorted_words = sorted(scores.items(), key=lambda x: x[1], reverse=True)

    for word, score1 in sorted_words[:3]:
        tags_file.write(str(tags_id) + " " + word + "\n")
        brt.write(str(idlist[i]) + " " + str(tags_id) + "\n")
        tags_id += 1

brt.close()

bloblist = []
idlist = []

with open('cocktails.txt') as co:
    while True:
        s = list(islice(co, 7))
        if not s:
            break
        idlist.append(int(s[0]))
        bloblist.append(tb(s[4].lower()))
    co.close()

cot = open('cocktail_tags.txt', 'w')

for i, blob in enumerate(bloblist):
    scores = {word: tfidf(word, blob, bloblist) for word in blob.words}
    sorted_words = sorted(scores.items(), key=lambda x: x[1], reverse=True)

    for word, score2 in sorted_words[:3]:
        tags_file.write(str(tags_id) + " " + word + "\n")
        cot.write(str(idlist[i]) + " " + str(tags_id) + "\n")
        tags_id += 1

cot.close()

bloblist = []
idlist = []

with open('countries.txt') as cu:
    while True:
        s = list(islice(cu, 8))
        if not s:
            break
        idlist.append(int(s[0]))
        bloblist.append(tb(s[4].lower()))
    cu.close()

cut = open('country_tags.txt', 'w')

for i, blob in enumerate(bloblist):
    scores = {word: tfidf(word, blob, bloblist) for word in blob.words}
    sorted_words = sorted(scores.items(), key=lambda x: x[1], reverse=True)

    for word, score3 in sorted_words[:3]:
        tags_file.write(str(tags_id) + " " + word + "\n")
        cut.write(str(idlist[i]) + " " + str(tags_id) + "\n")
        tags_id += 1

cut.close()

bloblist = []
idlist = []

with open('ingredients.txt') as ig:
    while True:
        s = list(islice(ig, 7))
        if not s:
            break
        idlist.append(int(s[0]))
        bloblist.append(tb(s[4].lower()))
    ig.close()

igt = open('ingredient_tags.txt', 'w')

for i, blob in enumerate(bloblist):
    scores = {word: tfidf(word, blob, bloblist) for word in blob.words}
    sorted_words = sorted(scores.items(), key=lambda x: x[1], reverse=True)

    for word, score in sorted_words[:3]:
        tags_file.write(str(tags_id) + " " + word + "\n")
        igt.write(str(idlist[i]) + " " + str(tags_id) + "\n")
        tags_id += 1

igt.close()

tags_file.close()
