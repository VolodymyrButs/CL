import { ConversionType as ConversionTypeDefault } from './conversions'
import { TrackingEventCategory as TrackingEventCategoryDefault } from './events'

export {
    sendEvent,
    sendConversion,
    getCID,
    getFBValidLink,
    gtag,
} from './tracking'
export type ConversionType = ConversionTypeDefault
export type TrackingEventCategory = TrackingEventCategoryDefault
