'use strict'

var gIsFirstLoad = false

function onInitGallery() {
    hideElement('.meme-container')
    hideElement('.saved-memes')
    showElement('.img-gallery')
    showElement('.keywords')
    renderGallery()
    renderKeywords()
}

function renderGallery() {
    // call getImgs
    // map getImgs to HTML elements and append to DOM
    const imgs = getImgs()
    let imgsHTML = ''

    imgsHTML += `<div class="add-image">
                    <span>Upload Image</span>
                    <input type="file" class="file-input" name="image" onchange="onImgInput(event)" />
                </div>`

    imgsHTML += imgs.map(img =>
        `<img src=${img.url} onclick='onImgSelect(${img.id})'>`
    ).join('')

    const elGallery = document.querySelector('.img-gallery')
    elGallery.innerHTML = imgsHTML
}

function renderKeywords() {
    const keywordsMap = countKeywords()
    const elKeywordContainer = document.querySelector('.keywords-list')
    let keywordHTML = ''
    for (var key in keywordsMap) {
        const fontSize = Math.floor(keywordsMap[key] * 3)
        const min = 16;
        const max = 48;
        const normalizedFontSize = (fontSize - min) / (max - min) * (max - min + 1) + min;
        keywordHTML += `<span onclick="onClickKeyword(this)" style="font-size: ${Math.floor(normalizedFontSize)}px">${key}</span>`
    }

    elKeywordContainer.innerHTML = keywordHTML
}

function onClickKeyword(elKeyword) {
    document.querySelector('#gallery-search').value = elKeyword.innerText.toLowerCase()
    renderGallery()
}

// TODO: upload own image to gallery
function onAddImage() {

}

function onImgSelect(imgId) {
    console.log(imgId)
    gIsFirstLoad = true
    setImg(imgId)
    hideElement('.img-gallery')
    hideElement('.keywords')
    showElement('.meme-container')
    onInitCanvas()
    renderMeme()
}


// The next 2 functions handle IMAGE UPLOADING to img tag from file system:
// function onImgInput(ev) {
//     loadImageFromInput(ev, renderImg)
// }

// // CallBack func will run on success load of the img
// function loadImageFromInput(ev, onImageReady) {
//     const reader = new FileReader()
//     // After we read the file
//     reader.onload = function (event) {
//         let img = new Image() // Create a new html img element
//         img.src = event.target.result // Set the img src to the img file we read
//         // Run the callBack func, To render the img on the canvas
//         img.onload = onImageReady.bind(() => {
//             gImgs.push(_createImg(19, `${img.src}`, getRandomKeywords()))
//         }, img)
//     }
//     reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
//     onImgSelect(19)
// }

// function renderImg(img) {
//     // Draw the img on the canvas
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
// }



