'use strict'

const IMAGE_COUNT = 18
const IMAGE_KEY = 'imageDB'

// global vars
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
// testing
var gFilterKeyword = 'funny'
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];


// list
function getImgs() {
    // filter by keywords
    const imgs = gImgs.filter(img => img.keywords.contains(gFilterKeyword))
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
    var imgs = loadFromStorage(STORAGE_KEY)
    if (!imgs || !imgs.length) {
        imgs = []
        for(let i = 0; i < IMAGE_COUNT; i++) {
            imgs.push(_createImg(i, `img/${i}.jpg`, ))
        }
        
    }
    gImgs = imgs
    saveToStorage()
}
// read
function findImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}
// update
// delete

