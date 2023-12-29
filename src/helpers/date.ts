import { parseISO, isValid } from 'date-fns'

export const isValidDate = (date: string) => {
    const parsedDate = parseISO(date)
    return isValid(parsedDate)
}
