import { BalconyDoorType } from 'cad/types'
import { toDxfStringLine } from './lineDxf'

export const toDxfStringBalconyDoor = (element: BalconyDoorType) => {
    if (element.balconyType === 'left') {
        return (
            toDxfStringLine({
                id: element.id,
                points: [...element.points[10], ...element.points[11]],
            }) +
            toDxfStringLine(
                {
                    id: element.id,
                    points: [...element.points[2], ...element.points[11]],
                },
                '5'
            ) +
            toDxfStringLine({
                id: element.id,
                points: [...element.points[12], ...element.points[14]],
            }) +
            toDxfStringLine({
                id: element.id,
                points: [...element.points[13], ...element.points[15]],
            }) +
            toDxfStringLine({
                id: element.id,
                points: [...element.points[0], ...element.points[1]],
            }) +
            toDxfStringLine(
                {
                    id: element.id,
                    points: [...element.points[1], ...element.points[11]],
                },
                '3'
            ) +
            toDxfStringLine({
                id: element.id,
                points: [...element.points[2], ...element.points[3]],
            }).concat(`0
ELLIPSE
8
${element.id}
10
${element.points[6][0] + 350}
20
${element.points[6][1] + 250}
11
350
40
0.6
41
0.0
42
6.283
0
TEXT
1
${`WB:${  element.points[9][0]}`}
8
${element.id}
10
${element.points[8][0] + 90}
20
${element.points[8][1] - 35}
40
70
0
TEXT
1
${`T:${  element.points[9][1]}`}
8
${element.id}
10
${element.points[7][0] + 40}
20
${element.points[7][1] - 35}
40
70
0
TEXT
1
${`DB:${  element.points[16][0]}`}
8
${element.id}
10
${element.points[17][0] + 100}
20
${element.points[17][1] - 45}
40
70
`)
        )
    }
    return (
        toDxfStringLine({
            id: element.id,
            points: [...element.points[10], ...element.points[11]],
        }) +
        (element.points[18]
            ? toDxfStringLine({
                  id: element.id,
                  points: [...element.points[18], ...element.points[19]],
              }) +
              toDxfStringLine(
                  {
                      id: element.id,
                      points: [...element.points[2], ...element.points[18]],
                  },
                  '5'
              ) +
              toDxfStringLine(
                  {
                      id: element.id,
                      points: [...element.points[11], ...element.points[18]],
                  },
                  '3'
              )
            : toDxfStringLine(
                  {
                      id: element.id,
                      points: [...element.points[2], ...element.points[11]],
                  },
                  '3'
              )) +
        toDxfStringLine({
            id: element.id,
            points: [...element.points[12], ...element.points[14]],
        }) +
        toDxfStringLine({
            id: element.id,
            points: [...element.points[13], ...element.points[15]],
        }) +
        toDxfStringLine({
            id: element.id,
            points: [...element.points[0], ...element.points[1]],
        }) +
        toDxfStringLine(
            {
                id: element.id,
                points: [...element.points[1], ...element.points[11]],
            },
            '5'
        ) +
        toDxfStringLine({
            id: element.id,
            points: [...element.points[2], ...element.points[3]],
        }).concat(`0
ELLIPSE
8
${element.id}
10
${element.points[6][0] + 350}
20
${element.points[6][1] + 250}
11
350
40
0.6
41
0.0
42
6.283
0
TEXT
1
${`WB:${  element.points[9][0]}`}
8
${element.id}
10
${element.points[8][0] + 90}
20
${element.points[8][1] - 35}
40
70
0
TEXT
1
${`T:${  element.points[9][1]}`}
8
${element.id}
10
${element.points[7][0] + 40}
20
${element.points[7][1] - 35}
40
70
0
TEXT
1
${`DB:${  element.points[16][0]}`}
8
${element.id}
10
${element.points[17][0] + 100}
20
${element.points[17][1] - 45}
40
70
`)
    )
}
