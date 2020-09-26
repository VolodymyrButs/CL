import { WallType } from 'cad/types'

export const toDxfStringLine = (element: WallType, color = '0') => {
    return `0
LINE
8
${element.id}
10
${element.points[0]}
20
${element.points[1]}
11
${element.points[2]}
21
${element.points[3]}
62
${color}
`
}
