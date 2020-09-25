import CustomWrapper from './wrapElement'
import './styles/global.css'
export const wrapPageElement = CustomWrapper

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
    const blockWrapper = window.document.getElementById('blockWrapper')
    if (location.hash) {
        return true
    } else {
        blockWrapper?.scrollTo({ top: 0, behavior: 'auto' })
        return false
    }
}
