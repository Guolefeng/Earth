import i18n from 'i18next';

const t = (s1: string, s2?: any) => {
    const r: string = i18n.t(s1, s2)
    return r
}

export {
    t
}