'use strict'

const MEME_KEY = 'memeDB'

// global
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            pos: { x: 150, y: 150 },
            align: 'left',
            color: 'red'
        }
    ]
}

// return current meme we're working on
function getMeme() {
    return gMeme
}

function saveMeme() {
    saveToStorage(MEME_KEY, gMeme)
}

// add text to meme at specified lineIdx, 0 - top , 1 - bottom , 2+ - center
function setLineTxt(txt, lineIdx) {
    gMeme.lines[lineIdx].txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}
