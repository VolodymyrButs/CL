import { TubeType } from 'cad/types'

export const toDxfStringTube = (element: TubeType, color = '10') => {
    return `0
CIRCLE
8
${element.id}
10
${element.points[0]}
20
${element.points[1]}
40
${element.points[2] / 2}
62
${color}
`
}
