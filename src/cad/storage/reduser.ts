/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, combineReducers } from 'redux'
import throtle from 'lodash/throttle'
import { loadState, saveState } from './localStorage'
import undoable from 'redux-undo'

const elements = (state: any = [], action: any) => {
    switch (action.type) {
        case 'addElement':
            return [...state, action.element]
        case 'addElements':
            return [...state, ...action.elements]
        case 'deleteElement':
            return state!.filter(
                (item: { id: string }) => item.id !== action.id
            )
        case 'changeCoordinate':
            return state.map((item: { id: string }) => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        points: action.points,
                    }
                }
                return item
            })
        case 'deleteState':
            return []
        default:
            return state
    }
}

const reduxApp = combineReducers({
    elements: undoable(elements),
})

const persistedState = loadState()
export const store = createStore(reduxApp, persistedState)
store.subscribe(
    throtle(() => {
        saveState({ elements: store.getState().elements })
    }, 1000)
)
export const storeSSR = () => createStore(reduxApp, persistedState)
