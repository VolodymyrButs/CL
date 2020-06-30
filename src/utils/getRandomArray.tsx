export const createRand = (
    randLength: number,
    min: number,
    max: number
): number[] => {
    let randArray: number[] = []
    let i = 0
    if (randLength > max - min + 1) {
        return []
    }
    while (i < randLength) {
        let rand = Math.floor(Math.random() * (max - min + 1)) + min
        if (!randArray.includes(rand)) {
            i++
            randArray.push(rand)
        }
    }
    return randArray
}
