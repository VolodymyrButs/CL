import { ApertureType } from 'cad/types'
import { toDxfStringLine } from './lineDxf'

export const toDxfStringAperture = (
    element: ApertureType,
    itIsDoor?: boolean
) => {
    const color = itIsDoor ? '3' : '5'
    return (
        toDxfStringLine({
            id: element.id,
            points: [...element.points[0], ...element.points[1]],
        }) +
        toDxfStringLine(
            {
                id: element.id,
                points: [...element.points[1], ...element.points[2]],
            },
            color
        ) +
        toDxfStringLine({
            id: element.id,
            points: [...element.points[2], ...element.points[3]],
        }).concat(`0
ELLIPSE
8
${element.id}
10
${element.points[6][0]}
20
${element.points[6][1]}
11
250
40
0.6
41
0.0
42
6.283
0
TEXT
1
${element.points[9][0]}
8
${element.id}
10
${element.points[8][0] + 20}
20
${element.points[8][1] - 70}
40
70
0
TEXT
1
${element.points[9][1]}
8
${element.id}
10
${element.points[7][0] + 20}
20
${element.points[7][1] - 70}
40
70
`)
    )
}
