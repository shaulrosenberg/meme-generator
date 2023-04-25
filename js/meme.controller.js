'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

// global vars
var gElCanvas
var gCtx

var gCanvasWidth
var gCanvasHeight
var gStartPos


// ?
function onInitCanvas() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    gCanvasHeight = gElCanvas.height
    gCanvasWidth = gElCanvas.width
    resizeCanvas()
    addEventListeners()
}

function renderMeme() {
    const meme = getMeme()
    drawImg(meme.selectedImgId)
}

// called when text input is changed (onchange event)
function onSetLineText(elText) {
    const txt = elText.value
    const meme = getMeme()
    // update
    if (meme.isLineSelected) {
        setLineTxt(txt, meme.selectedLineIdx)
    }

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
    const meme = getMeme()
    // apply meme options
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
    meme.lines.forEach((line, idx) => {
        // draw each line at pos {x, y} = line.pos
        drawText(meme.lines[idx].txt, line.pos.x, line.pos.y)
    })
}

function onAddLine() {
    const lineText = document.querySelector('#lineText').value
    const meme = getMeme()
    let lineCount = meme.lines.length

    // first line - top
    if (lineCount === 0) {
        addLine(lineText, 40, { x: gCanvasWidth / 2, y: gCanvasHeight / 10 }, 'center', 'black')
    }
    // second line - bottom
    else if (lineCount === 1) {
        addLine(lineText, 40, { x: gCanvasWidth / 2, y: gCanvasHeight - gCanvasHeight * 0.15 }, 'center', 'black')
    }
    // rest center
    else {
        addLine(lineText, 40, { x: gCanvasWidth / 2, y: gCanvasHeight / 2 }, 'center', 'black')
    }

    meme.selectedLineIdx = meme.lines.length - 1
    renderMeme()
}

// add events listeners to form inputs? and canvas
function addEventListeners() {
    addMouseEvents()
    addTouchEvents()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseEvents() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchEvents() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // console.log('pos:', pos)
    if (!isLineClicked(pos)) return

    // console.log('Down')
    setLineDrag(true)
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getLine()
    if (!isDrag) return
    // console.log('Move')

    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // console.log('pos:', pos)
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        // console.log('ev.pageX:', ev.pageX)
        // console.log('ev.pageY:', ev.pageY)
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
        // console.log('pos:', pos)
    }
    return pos
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