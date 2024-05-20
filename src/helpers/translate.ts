import lang from '../pkg/lang'

export const Translate = (
    key: string,
    args: Record<string, string> = {},
    locale: 'en' | 'id' = 'id'
) => {
    lang.setLocale(locale || lang.getLocale())

    // override value message to translate of args
    if (Object.keys(args).length)
        for (const index in args) {
            if (Object.prototype.hasOwnProperty.call(args, index)) {
                const element = args[index]
                args[index] = lang.__(element)
            }
        }

    return lang.__(key, args)
}
