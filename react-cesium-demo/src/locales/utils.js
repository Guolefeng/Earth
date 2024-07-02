export const getLanguage = () => {
    let lang = navigator.language || navigator.userLanguage; // 常规浏览器语言和IE浏览器
    return lang
}

