'use strict'

// global vars
var gElCanvas
var gCtx


// ?
function onInit() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    // renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    // render meme img to canvas
    // render meme.lines.txt to canvas
}

// resize canvas on('resize', resizeCanvas)
function resizeCanvas() {
    
}