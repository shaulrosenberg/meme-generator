'use strict'

const STORAGE_KEY = 'memeDB'

var gSavedMemes


function getSavedMemes() {
    let memes = loadFromStorage(STORAGE_KEY)
    
}

function addSavedMeme() {

}

function saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

