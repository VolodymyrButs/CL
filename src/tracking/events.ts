import { ConversionType } from './conversions'

export type TrackingEventName =
    | 'FormSubminAttempt'
    | 'FormSubminSuccess'
    | 'FormSubminFail'
    | 'Click'
    | 'SocialIcon'
    | 'Phone'
    | 'Email'
    | 'FullScreen'
    | 'ShowSlide'

export type TrackingEventCategory =
    | ConversionType
    | 'DefaultForm'
    | 'LanguageChange'
    | 'ShowMoreButton'
    | 'ShowMoreButtonFAQ'
    | 'Address'
    | 'GoogleRewiews'
    | 'FAQItem'
    | 'ServicesItem'
    | 'WikiItem'
    | 'ReviewItem'
    | 'Slider'
