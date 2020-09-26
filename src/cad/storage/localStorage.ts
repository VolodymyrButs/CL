/* eslint-disable @typescript-eslint/no-explicit-any */
export const loadState = () => {
    try {
        const serializedState = window && window.localStorage.getItem('state')
        if (serializedState === null) {
            return []
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return []
    }
}

export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state)
        window && window.localStorage.setItem('state', serializedState)
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
    }
}
