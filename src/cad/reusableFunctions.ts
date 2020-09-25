export const getSelectedWallLength = (wall: { points: number[] }) => {
    if (wall !== undefined) {
        if (wall.points[0] !== wall.points[2]) {
            return Math.abs(wall.points[0] - wall.points[2])
        }
        return Math.abs(wall.points[1] - wall.points[3])
    }
    return 1
}
export const calculateDefaultIndent = (
    selected: string | undefined,
    selectedLine: { points: number[] } | undefined,
    balcony?: boolean
) => {
    if (selectedLine !== undefined) {
        if (
            selected &&
            selectedLine.points[0] !== selectedLine.points[2] &&
            Math.abs(selectedLine.points[0] - selectedLine.points[2]) >
                (balcony ? 1500 : 900)
        ) {
            return (
                (Math.abs(selectedLine.points[0] - selectedLine.points[2]) -
                    (balcony ? 1500 : 900)) /
                2
            )
        }

        if (
            selected &&
            selectedLine.points[0] === selectedLine.points[2] &&
            Math.abs(selectedLine.points[1] - selectedLine.points[3]) >
                (balcony ? 1500 : 900)
        ) {
            return (
                (Math.abs(selectedLine.points[1] - selectedLine.points[3]) -
                    (balcony ? 1500 : 900)) /
                2
            )
        }

        return 100
    }
    return 1
}
