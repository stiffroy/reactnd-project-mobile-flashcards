import { AsyncStorage } from 'react-native'
import { initialData } from './_data'

const STORAGE_KEY = 'MobileFlashcards:decks'

// fetch all decks as list
export function getDecksApi() {
    return AsyncStorage.getItem(STORAGE_KEY).then(result => {
        if(result !== null) {
            return JSON.parse(result)
        } else {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
            return initialData
        }
    })
}

// get a single deck from the deck list
export function getDeckApi(title) {
    return getDecksApi().then((decks) => decks[title])
}

// create a new deck
export function createDeckApi(title) {
    const deckObj = { title, questions: [] }
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [title]: deckObj
    }))
}

// add a new card to an existing deck
export function addCardToDeckApi(title, card) {
    return getDecksApi().then((decks) => {
        decks[title].questions.push(card)
        AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks))
    })
}
