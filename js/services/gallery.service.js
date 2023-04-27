'use strict'

const IMAGE_COUNT = 18
const IMAGE_KEY = 'imageDB'

// global vars
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gFilterKeyword = 'funny'
var gImgs
// var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];

_createImgs()

// list
function getImgs() {
    // filter by keywords
    // const imgs = gImgs.filter(img => img.keywords.contains(gFilterKeyword))
    return gImgs
}

// create
function _createImg(imgId, imgUrl, keywords) {
    return {
        id: imgId,
        url: imgUrl,
        keywords: keywords
    }
}

function _createImgs() {
    var imgs = loadFromStorage(IMAGE_KEY)
    if (!imgs || !imgs.length) {
        imgs = []
        for (let i = 1; i <= IMAGE_COUNT; i++) {
            imgs.push(_createImg(i, `img/${i}.jpg`, getRandomKeywords()))
        }

    }
    gImgs = imgs
    saveToStorage(IMAGE_KEY, gImgs)
}
// read
function findImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}
// update
// delete

