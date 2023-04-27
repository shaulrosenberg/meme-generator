'use strict'

const STORAGE_KEY = 'memeDB'

var gSavedMemes



function getSavedMemes() {
    let memes = loadFromStorage(STORAGE_KEY)
    if (!memes || !memes.length) {
        memes = []
    }

    gSavedMemes = memes
    return gSavedMemes
}

function addSavedMeme() {
    const memes = getSavedMemes()
    memes.push({ ...getMeme(), src: getMemeSrc() })
    saveMemesToStorage()
}

function saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function getMemeSrc() {
    return gElCanvas.toDataURL()
}

