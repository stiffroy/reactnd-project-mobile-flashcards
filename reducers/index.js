import { GET_DECKS, ADD_DECK, ADD_CARD } from '../actions'

export default function deckReducer(state = {}, action) {
    switch(action.type) {
        case GET_DECKS:
            return action.decks
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_CARD:
            const deck = state[action.deck]
            deck.questions.push(action.card)
            return {
                ...state,
                [action.deck]: deck
            }
        default:
            return state
    }
}