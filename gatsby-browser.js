import CustomWrapper from './wrapElement'
import './styles/global.css'
export const wrapPageElement = CustomWrapper

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
    // eslint-disable-next-line no-undef
    const blockWrapper = window.document.getElementById('blockWrapper')
    if (location.hash) {
        return true
    } else {
        blockWrapper.scrollTo({ top: 0, behavior: 'auto' })
        return false
    }
}
