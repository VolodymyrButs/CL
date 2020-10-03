const conversionTypes = [
    'JumpingArrow',
    'FormCommercialProposal',
    'FormPromoPageBottom',
    'FormIndexPageBottom',
    'FormServicesPageBottom',
    'CallBackButtonForm',
    'CallbackFromPromo',
    'CallbackFromProject',
    'CallbackFromWorks',
    'SocialIconViber',
    'SocialIconTelegram',
    'SocialIconWhatsApp',
    'SocialIconFacebook',
    'SocialIconInstagram',
    'PhoneClick',
    'EmailClick',
]
export type ConversionType = typeof conversionTypes[number]
export const isConversionType = (value: string): value is ConversionType =>
    conversionTypes.includes(value)

type Conversions = Record<ConversionType, string>

const devConversions: Conversions = {
    JumpingArrow: '8TXxCOu81d4BEMuHrp8C',
    FormCommercialProposal: 'GAW3CM_O4t4BEMuHrp8C',
    FormPromoPageBottom: 'todo-define',
    FormIndexPageBottom: 'todo-define',
    FormServicesPageBottom: 'todo-define',
    CallBackButtonForm: 'todo-define',
    CallbackFromPromo: 'todo-define',
    CallbackFromProject: 'todo-define',
    CallbackFromWorks: 'todo-define',
    SocialIconViber: 'todo-define',
    SocialIconTelegram: 'todo-define',
    SocialIconWhatsApp: 'todo-define',
    SocialIconFacebook: 'todo-define',
    SocialIconInstagram: 'todo-define',
    PhoneClick: 'todo-define',
    EmailClick: 'todo-define',
}

const propConversions: Conversions = {
    JumpingArrow: 'todo-define',
    FormCommercialProposal: 'todo-define',
    FormPromoPageBottom: 'todo-define',
    FormIndexPageBottom: 'todo-define',
    FormServicesPageBottom: 'todo-define',
    CallbackFromPromo: 'todo-define',
    CallbackFromProject: 'todo-define',
    CallbackFromWorks: 'todo-define',
    CallBackButtonForm: 'todo-define',
    SocialIconViber: 'todo-define',
    SocialIconTelegram: 'todo-define',
    SocialIconWhatsApp: 'todo-define',
    SocialIconFacebook: 'todo-define',
    SocialIconInstagram: 'todo-define',
    PhoneClick: 'todo-define',
    EmailClick: 'todo-define',
}

const conversions = {
    dev: devConversions,
    prod: propConversions,
}

// TODO: define dynamicly
const env = 'dev'

export const getConversionId = (conversionType: ConversionType) =>
    conversions[env][conversionType]
