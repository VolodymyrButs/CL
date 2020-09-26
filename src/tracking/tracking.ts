import { keysToSnakeCase } from 'utils/toSnakeCase'
import { ConversionType, getConversionId } from './conversions'
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

const sendEventToGTag =
    (typeof window !== 'undefined' && window?.gtag) || devGTag

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

    sendEventToGTag('event', eventName, {
        ...keysToSnakeCase(eventParams),
        event_location: location,
        event_callback: callback,
    })
}

export const sendConversion = (
    conversionType: ConversionType,
    callback?: () => void
): void =>
    sendEventToGTag('event', 'conversion', {
        send_to: `${awId}/${getConversionId(conversionType)}`,
        event_callback: callback,
    })

export const getCID = (): string => {
    // const ga = typeof window !== 'undefined' && window?.ga
    if (typeof window === 'undefined' || !window.ga) return ''

    const tracker = window.ga.getAll()[0]
    return tracker.get('clientId')
}
