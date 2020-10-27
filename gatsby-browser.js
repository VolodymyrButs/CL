import CustomWrapper from './wrapElement'
import './styles/global.css'
export const wrapPageElement = CustomWrapper

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
    var scale = 'scale(1)'
    document.body.style.webkitTransform = scale // Chrome, Opera, Safari
    document.body.style.msTransform = scale // IE 9
    document.body.style.transform = scale
    const blockWrapper = window.document.getElementById('blockWrapper')
    if (location.hash) {
        return true
    } else {
        blockWrapper?.scrollTo({ top: 0, behavior: 'auto' })
        return false
    }
}
