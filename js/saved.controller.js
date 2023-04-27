'use strict'



function onInitSavedMemes() {
    // hide meme-container
    // hide gallery
    // show SavedMemesContainer
    // getSavedMemes
    // renderSavedMeme
    hideElement('.img-gallery')
    hideElement('.meme-container')
    showElement('.saved-memes')
    renderSavedMemes()
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    let strHTML = ''

    strHTML = savedMemes.map( meme => 
    `
    <img src=${meme.src} onclick='onEditMeme(${meme})'>
    `
    ).join('')

    const elContainer = document.querySelector('.saved-memes')

    elContainer.innerHTML = strHTML
}

function onSaveMeme() {
    // add entire gMeme Object in case of editing, but add meme.src = canvas.toDataURL() for gallery display
    // when rendering display images according to meme.src
    // when clicking to edit a meme -> go back to editor and load gMeme object
    addSavedMeme()
}

// ?
function onRemoveMeme() {

}


function onEditMeme(meme) {
    // 
}