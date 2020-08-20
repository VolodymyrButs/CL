interface LocaleConfig {
    locale: string
    label: string
    pathPrefix: string
    isDefault?: Boolean
}

interface LocaleConfigs {
    [key: string]: LocaleConfig
}

export const languages: LocaleConfigs = {
    uk: {
        locale: 'uk_UA',
        label: 'УКР',
        pathPrefix: '',
        isDefault: true,
    },
    ru: {
        locale: 'ru_RU',
        label: 'РУС',
        pathPrefix: 'ru',
    },
    en: {
        locale: 'en_GB',
        label: 'ENG',
        pathPrefix: 'en',
    },
}
