'use strict'

// global vars
var gElCanvas
var gCtx

var gCanvasWidth
var gCanvasHeight


// ?
function onInit() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    gCanvasHeight = gElCanvas.height
    gCanvasWidth = gElCanvas.width
    resizeCanvas()
    // renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    // render meme img to canvas
    // render meme.lines.txt to canvas -> for loop?
}

// called when text input is changed (onchange event)
function onSetLineText(elText) {

}

// resize canvas on('resize', resizeCanvas)
function resizeCanvas() {

}

// add events listeners to form inputs? and canvas
function addEventListeners() {
    addMouseEvents()
    addTouchEvents()
}

function addMouseEvents() {

}

function addTouchEvents() {

}

//////////////////////////////////////////////////