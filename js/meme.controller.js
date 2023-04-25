'use strict'

// global vars
var gElCanvas
var gCtx

var gCanvasWidth
var gCanvasHeight


// ?
function onInitCanvas() {
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
    drawImg(meme.selectedImgId)
}

// called when text input is changed (onchange event)
function onSetLineText(elText) {
    const txt = elText.value
    const meme = getMeme()
    setLineTxt(txt, meme.selectedLineIdx)
    renderMeme()
}

// resize canvas on('resize', resizeCanvas)
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
}

function drawImg(imgId) {
    const elImg = new Image() // Create a new html img element
    elImg.src = `img/${imgId}.jpg` // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawLines()
    }
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Impact'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

// draw all lines after image is rendered
function drawLines() {
    const meme = getMeme()
    meme.lines.forEach(line => {
        const {x, y} = line.pos
        drawText(meme.lines[meme.selectedLineIdx].txt, x, y)
    })
}

// add events listeners to form inputs? and canvas
function addEventListeners() {
    addMouseEvents()
    addTouchEvents()
    // add resize event
}

function addMouseEvents() {

}

function addTouchEvents() {

}

//////////////////////////////////////////////////


function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()

    elLink.href = data // Put it on the link
    elLink.download = 'my-img' // Can change the name of the file
}

function showMemeEdit() {
    document.querySelector('.meme-container').classList.remove('display-none')
}