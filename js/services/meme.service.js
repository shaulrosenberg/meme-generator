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
    let blockPadding = 10
    let inlinePadding = 10
    
    let x = line.pos.x - inlinePadding
    let y = line.pos.y - blockPadding

    let width = gCtx.measureText(line.txt).width

    if (line.align === 'center') {
        x -= width * 0.5
    }

    let xEnd = x + width + inlinePadding * 2
    let yEnd = y + line.size + blockPadding * 2
    return { x, y, xEnd, yEnd }
}

// need to account for left/right/center alignment
function getSelectedLine(x, y) {
    return gMeme.lines.find(line => {
        const lineBorder = getLineBorder(line)
        return x <= lineBorder.xEnd && x >= lineBorder.x && y <= lineBorder.yEnd && y >= lineBorder.y
    })
}

// TODO: seperate to 2 functions -> setSelectedLine(true/false)?
function isLineClicked(pos) {
    const lineClicked = getSelectedLine(pos.x, pos.y)
    if (lineClicked !== undefined) {
        gMeme.selectedLineIdx = gMeme.lines.findIndex(line => line.pos.x === lineClicked.pos.x && line.pos.y === lineClicked.pos.y)
        gMeme.isLineSelected = true
        return true
    }
    gMeme.isLineSelected = false
    return false
}

function saveMeme() {
    saveToStorage(MEME_KEY, gMeme)
}

// UPDATE
function setLineTxt(txt, lineIdx) {
    gMeme.lines[lineIdx].txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

// TODO: adjust position after alignment
function setAlign(align) {
    if (!gMeme.isLineSelected) return
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function setFont(font) {
    if (!gMeme.isLineSelected) return
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setFontSize(size) {
    if (!gMeme.isLineSelected) return
    gMeme.lines[gMeme.selectedLineIdx].size += size
}

function setColor(color) {
    if (!gMeme.isLineSelected) return
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setLineDrag(newState) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = newState
}

// CREATE
function addLine(txt, size, pos, align, color, isDrag = false, fill, font) {
    gMeme.lines.push({ txt, size, pos, align, color, isDrag, fill, font })
}

// DELETE
function deleteLine() {
    if (!gMeme.isLineSelected) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

// UPDATE
function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function switchLine() {

}

// READ
