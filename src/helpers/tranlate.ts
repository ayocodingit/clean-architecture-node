import lang from '../pkg/lang'

export const tranlate = (key: string, args: Record<string, any>) => {
    return lang.__(key, args)
}
