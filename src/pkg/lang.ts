import lang from 'i18n'

lang.configure({
    locales: ['en', 'id'],
    directory: __dirname + '/lang',
    updateFiles: false,
    defaultLocale: 'en',
})

export default lang
