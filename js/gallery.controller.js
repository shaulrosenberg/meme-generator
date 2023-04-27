'use strict'

var gIsFirstLoad = false

function onInitGallery() {
    hideElement('.meme-container')
    hideElement('.saved-memes')
    showElement('.img-gallery')
    renderGallery()
}

function renderGallery() {
    // call getImgs
    // map getImgs to HTML elements and append to DOM
    const imgs = getImgs()
    let imgsHTML = ''
    // imgsHTML += `<label for="gallery-search">Search Gallery: </label> <input list="keywords-list" id="gallery-search" name="gallery-search">
    //             <datalist id="keywords-list></datalist> <section class="keywords"><option>funny</option></section>`

    imgsHTML += imgs.map(img =>
        `<img src=${img.url} onclick='onImgSelect(${img.id})'>`
    ).join('')

    const elGallery = document.querySelector('.img-gallery')
    elGallery.innerHTML = imgsHTML
}

// TODO: upload own image to gallery
function onAddImage() {

}

function onImgSelect(imgId) {
    console.log(imgId)
    gIsFirstLoad = true
    setImg(imgId)
    hideElement('.img-gallery')
    showElement('.meme-container')
    onInitCanvas()
    renderMeme()
}