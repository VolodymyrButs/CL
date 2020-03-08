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
  ua: {
    locale: "uk_UA",
    label: "UA",
    pathPrefix: "",
    isDefault: true,
  },
  ru: {
    locale: "ru_RU",
    label: "RU",
    pathPrefix: "ru",
  },
  en: {
    locale: "en_GB",
    label: "EN",
    pathPrefix: "en",
  },
}
