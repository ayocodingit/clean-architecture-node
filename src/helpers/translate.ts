import lang from '../pkg/lang'

export const translate = (key: string, args: Record<string, any>) => {
    return lang.__(key, args)
}
