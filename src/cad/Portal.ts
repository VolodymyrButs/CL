/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import ReactDOM from 'react-dom'

export class Portal extends React.Component {
    defaultNode: any
    props: any
    componentDidMount() {
        this.renderPortal()
    }

    componentDidUpdate(props: any) {
        this.renderPortal(props)
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.defaultNode || this.props.node)
        if (this.defaultNode) {
            window && window.document.body.removeChild(this.defaultNode)
        }
        this.defaultNode = null
    }

    renderPortal(props?: any) {
        if (props && !this.props.node) {
            return
        }

        let children: any = this.props.children
        if (typeof children!.type === 'function') {
            children = React.cloneElement(children)
        }

        ReactDOM.render(children, this.props.node)
    }

    render() {
        return null
    }
}
