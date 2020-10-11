import { keysToSnakeCase } from 'utils/toSnakeCase'
import {
    ConversionType,
    getConversionId,
    isConversionType,
} from './conversions'
import { TrackingEventCategory, TrackingEventName } from './events'

// TODO: move to env
const awId = 'AW-602637259'

/* eslint-disable camelcase */
interface GTagEventParams {
    // @ts-ignore
    event_callback?: () => void
}

const devGTag = (
    type: string,
    eventName: string,
    eventParams: GTagEventParams
) => {
    /* eslint-disable-next-line no-console */
    console.log(`GTag: ${type}`, eventName, eventParams)

    eventParams?.event_callback && eventParams?.event_callback()
}

export const gtag = (typeof window !== 'undefined' && window?.gtag) || devGTag

const devFBQ = (...params: unknown[]) => {
    /* eslint-disable-next-line no-console */
    console.log('FBQ: ', ...params, window?.fbq)
}

const sendEventToFB = (typeof window !== 'undefined' && window?.fbq) || devFBQ

const getFBEventName = (
    eventName: TrackingEventName,
    eventCategory: TrackingEventCategory
): 'GASubmit' | 'GAEvent' | 'GATest' => {
    if (
        eventName.toLowerCase().includes('attempt') ||
        eventName.toLowerCase().includes('fail')
    ) {
        return 'GAEvent'
    }

    return isConversionType(eventCategory) ? 'GASubmit' && 'GATest' : 'GAEvent'
}

interface EventParams {
    eventCategory: TrackingEventCategory
    [key: string]: string
}

export const sendEvent = (
    eventName: TrackingEventName,
    eventParams: EventParams,
    callback?: () => void
): void => {
    const location =
        (typeof window !== 'undefined' && window?.location.pathname) ||
        'unknown-location'

    gtag('event', eventName, {
        ...keysToSnakeCase(eventParams),
        event_location: location,
        event_callback: callback,
    })

    const { eventCategory } = eventParams

    sendEventToFB('trackCustom', getFBEventName(eventName, eventCategory), {
        goalCategory: eventCategory,
        goalAction: eventName,
    })
}

export const sendConversion = (
    conversionType: ConversionType,
    callback?: () => void
): void =>
    gtag('event', 'conversion', {
        send_to: `${awId}/${getConversionId(conversionType)}`,
        event_callback: callback,
    })

export const getCID = (): string => {
    // const ga = typeof window !== 'undefined' && window?.ga
    if (typeof window === 'undefined' || !window.ga) return ''

    const tracker = window.ga.getAll()[0]
    return tracker.get('clientId')
}

const pageLoadTime = Date.now()

const getCookie = (cookieName: string) => {
    var results = document.cookie.match(`(^|;) ?${cookieName}=([^;]*)(;|$)`)

    if (results) {
        return unescape(results[2])
    } else {
        return null
    }
}

const fbPixelId = process.env.GATSBY_FB_PIXEL_ID

export const getFBValidLink = () => {
    const { height, width } = window?.screen
    const fbp = getCookie('_fbp')

    return `https://www.facebook.com/tr/?id=${fbPixelId}&ev=GAValid&dl=${
        location?.href
    }&rl=&if=false&ts=${Date.now()}&sw=${width}&sh=${height}&v=2.9.27&r=stable&o=30&fbp=${fbp}&it=${pageLoadTime}&coo=false&rqm=GET`
}
