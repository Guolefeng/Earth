import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLanguage } from './utils'
import zh_CNCommon from './zh_CN/common'

const resources = {
    'zh-CN': {
        common: {
            ...zh_CNCommon, // 公共部分
        },
    }
}

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: getLanguage(),

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    })

export default i18n