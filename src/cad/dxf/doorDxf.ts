import { MainDoorType, WallType } from 'cad/types'
import { toDxfStringLine } from './lineDxf'

export const toDxfStringDoor = (element: MainDoorType) => {
    const vector1: WallType = {
        id: element.id,
        points: [
            element.points[0],
            element.points[1],
            element.points[0],
            element.points[1] + element.points[2],
        ],
    }
    const vector2: WallType = {
        id: element.id,
        points: [
            element.points[0],
            element.points[1],
            element.points[0] + element.points[3],
            element.points[1],
        ],
    }
    const vector3: WallType = {
        id: element.id,
        points: [
            element.points[0] + element.points[3],
            element.points[1],
            element.points[0] + element.points[3],
            element.points[1] + element.points[2],
        ],
    }
    return `${toDxfStringLine(vector1)}${toDxfStringLine(
        vector2,
        '2'
    )}${toDxfStringLine(vector3)}0
ELLIPSE
8
${element.id}
10
${element.points[0] + element.points[3] / 2}
20
${element.points[1] + element.points[2] / 2}
11
200
40
0.5
41
0.0
42
6.283
0
TEXT
1
${element.points[4]}
8
${element.id}
10
${element.points[0] + element.points[3] / 2 - 130}
20
${element.points[1] + element.points[2] / 2 - 50}
40
100
`
}
