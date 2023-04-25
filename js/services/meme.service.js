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
            pos: { x: 150, y: 150 }, // update this field when adding new text setText/onSetText
            align: 'left',
            color: 'red',
            isDrag: false
        }
    ]
}

// return current meme we're working on
function getMeme() {
    return gMeme
}

// calc x,y xEnd, yEnd (for drag and drop and selecting text lines)
function getLineBorder(line) {

}

// add to onclick canvas
function getSelectedLine(x, y) {
    return gMeme.lines.find(line => {
        const lineBorder = getLineBorder(line)
        return x <= lineBorder.xEnd && x >= lineBorder.x && y <= lineBorder.yEnd && y >= lineBorder.y 
    })
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

function addLine(txt, size, pos, align, color) {
    gMeme.lines.push({txt, size, pos, align, color})
}
