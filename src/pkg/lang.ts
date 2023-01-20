import i18n from 'i18n'

class Lang {
    public lang: typeof i18n
    constructor() {
        i18n.configure({
            locales: ['en'],
            directory: __dirname + '/lang',
        })
        this.lang = i18n
    }
}

export default new Lang().lang
