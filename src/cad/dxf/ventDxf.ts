import { VentType } from 'cad/types'
import { toDxfStringLine } from './lineDxf'

export const toDxfStringVent = (element: VentType, color = '150') => {
    return (
        toDxfStringLine(
            {
                id: element.id,
                points: [
                    element.points[0],
                    element.points[1],
                    element.points[0] + 150,
                    element.points[1],
                ],
            },
            color
        ) +
        toDxfStringLine(
            {
                id: element.id,
                points: [
                    element.points[0] + 150,
                    element.points[1],
                    element.points[0] + 150,
                    element.points[1] + 150,
                ],
            },
            color
        ) +
        toDxfStringLine(
            {
                id: element.id,
                points: [
                    element.points[0] + 150,
                    element.points[1] + 150,
                    element.points[0],
                    element.points[1] + 150,
                ],
            },
            color
        ) +
        toDxfStringLine(
            {
                id: element.id,
                points: [
                    element.points[0],
                    element.points[1] + 150,
                    element.points[0],
                    element.points[1],
                ],
            },
            color
        ).concat(`0
TEXT
1
${element.points[4]}
8
${element.id}
10
${element.points[2] + 20}
20
${element.points[3] - 70}
40
70
`)
    )
}
