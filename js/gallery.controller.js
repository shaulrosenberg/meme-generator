'use strict'




function renderGallery() {
    // call getImgs
    // map getImgs to HTML elements and append to DOM
    const imgs = getImgs()
    let imgsHTML = ''

    imgsHTML = imgs.map(img => 
    `<img src='${img.id}.jpg' onclick='onImgSelect('${img.id}')'>`
    ).join()

    const elGallery = document.querySelector('img-gallery')
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
}