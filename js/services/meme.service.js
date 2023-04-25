'use strict'

const MEME_KEY = 'memeDB'

// global
var gMeme = {
    selectedImgId: 5,
    isLineSelected: false, // need this for 2 cases: editing a selected line or simply adding a new line
    selectedLineIdx: 0,
    lines: [
        // {
        //     txt: 'I sometimes eat Falafel',
        //     size: 20,
        //     pos: { x: 150, y: 150 }, // update this field when addLine(), or when editing selected line
        //     align: 'left',
        //     color: 'red',
        //     isDrag: false,
        //     fill: 'white'
        //     font: 'Arial'
        // }
    ]
}

// return current meme we're working on
function getMeme() {
    return gMeme
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

// calc x,y xEnd, yEnd (for drag and drop and selecting text lines)
function getLineBorder(line) {
    let x = line.pos.x
    let y = line.pos.y
    let xEnd = x + line.txt.length * (line.size * 0.85)
    let yEnd = y + line.size + line.size * 0.5
    return { x, y, xEnd, yEnd }
}

// add to onclick canvas -> set gMeme.selected get x,y from event.clientX/clientY
// need to account for left/right/center alignment
function getSelectedLine(x, y) {
    return gMeme.lines.find(line => {
        const lineBorder = getLineBorder(line)
        return x <= lineBorder.xEnd && x >= lineBorder.x && y <= lineBorder.yEnd && y >= lineBorder.y
    })
}

function isLineClicked(pos) {
    const lineClicked = getSelectedLine(pos.x, pos.y)
    if (lineClicked !== undefined) {
        gMeme.selectedLineIdx = gMeme.lines.findIndex(line => line.pos.x === lineClicked.pos.x && line.pos.y === lineClicked.pos.y)
        return true
    }
    return false
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

function setLineDrag(newState) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = newState
}

function addLine(txt, size, pos, align, color) {
    gMeme.lines.push({ txt, size, pos, align, color, isDrag: false })
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}
