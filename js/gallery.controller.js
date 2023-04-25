'use strict'


function onInitGallery() {
    renderGallery()
}

function renderGallery() {
    // call getImgs
    // map getImgs to HTML elements and append to DOM
    const imgs = getImgs()
    let imgsHTML = ''

    imgsHTML = imgs.map(img =>
        `<img src=${img.url} onclick='onImgSelect(${img.id})'>`
    ).join('')

    const elGallery = document.querySelector('.img-gallery')
    elGallery.innerHTML = imgsHTML
}

function hideGallery() {
    const elGallery = document.querySelector('.img-gallery')
    elGallery.classList.add('display-none')
    elGallery.hidden = true
}

function onImgSelect(imgId) {
    console.log(imgId)
    setImg(imgId)
    hideGallery()
    showMemeEdit()
    onInitCanvas()
    renderMeme()
}