// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getElements = (state: { elements: { present: any } }) =>
    state.elements.present
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const statePastElements = (state: { elements: { past: any } }) =>
    state.elements.past
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stateFutureElements = (state: { elements: { future: any } }) =>
    state.elements.future
