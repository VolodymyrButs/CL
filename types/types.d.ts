declare module '*.svg' {
    import React = require('react')
    const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
    export default ReactComponent
}
declare module 'path-browserify' {
    import path from 'path'
    export default path
}