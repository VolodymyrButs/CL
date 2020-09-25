import { HeaterType } from 'cad/types'
import { toDxfStringLine } from './lineDxf'

export const toDxfStringBattery = (element: HeaterType, color = '24') => {
    return (
        toDxfStringLine(
            {
                id: element.id,
                points: [...element.points[0], ...element.points[1]],
            },
            color
        ) +
        toDxfStringLine(
            {
                id: element.id,
                points: [...element.points[1], ...element.points[2]],
            },
            color
        ) +
        toDxfStringLine(
            {
                id: element.id,
                points: [...element.points[2], ...element.points[3]],
            },
            color
        ) +
        toDxfStringLine(
            {
                id: element.id,
                points: [...element.points[3], ...element.points[0]],
            },
            color
        )
    )
}
