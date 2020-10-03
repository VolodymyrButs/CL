declare module '*.svg' {
    import React = require('react')
    const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
    export default ReactComponent
}
declare module 'path-browserify' {
    import path from 'path'
    export default path
}
declare module 'use-gestures' {
    import useGestures from 'useGestures'
    export default useGestures
}

declare var ga: GAfn
interface GAfn {
    getAll: () => Tracker[]
}

interface Tracker {
    get: (param: string) => string
}

declare var fbq: fbqFn

type fbqFn = (type: string, eventName: string, eventData: object) => void
