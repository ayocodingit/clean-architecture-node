import { parseISO, isValid, addDays } from 'date-fns'

export const isValidDate = (date: string) => {
    const parsedDate = parseISO(date)
    return isValid(parsedDate)
}

export const addDaysToDate = (startDate: Date, daysToAdd: number) => {
    return addDays(startDate, daysToAdd)
}
