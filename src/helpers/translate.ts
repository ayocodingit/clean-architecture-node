import lang from '../pkg/lang'

export const Translate = (key: string, args: Record<string, any>) => {
    return lang.__(key, args)
}
