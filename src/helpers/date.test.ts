import { addDays } from 'date-fns'
import { addDaysToDate, isValidDate } from './date'

describe('isValidDate', () => {
    it('should return true for a valid date', () => {
        const validDateString = '2023-11-21'
        const result = isValidDate(validDateString)

        expect(result).toBe(true)
    })

    it('should return false for an invalid date', () => {
        const invalidDateString = 'invalid-date'
        const result = isValidDate(invalidDateString)

        expect(result).toBe(false)
    })
})

describe('addDaysToDate function', () => {
    it('should correctly add days to the date', () => {
        const startDate = new Date('2022-01-01')
        const daysToAdd = 7

        const result = addDaysToDate(startDate, daysToAdd)
        const expectedResult = addDays(startDate, daysToAdd)

        expect(result).toEqual(expectedResult)

        expect(result instanceof Date).toBeTruthy()
    })

    it('should handle negative daysToAdd correctly', () => {
        const startDate = new Date('2022-01-15')
        const daysToAdd = -5

        const result = addDaysToDate(startDate, daysToAdd)
        const expectedResult = addDays(startDate, daysToAdd)

        expect(result).toEqual(expectedResult)
    })

    it('should return a new Date object', () => {
        const startDate = new Date()
        const daysToAdd = 10

        const result = addDaysToDate(startDate, daysToAdd)

        expect(result).not.toBe(startDate)
    })
})
