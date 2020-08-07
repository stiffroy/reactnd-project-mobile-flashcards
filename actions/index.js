export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function getAllDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}

export function addNewDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addNewCard(deck, card) {
    return {
        type: ADD_CARD,
        deck,
        card
    }
}