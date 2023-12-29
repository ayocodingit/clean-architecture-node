import { isValidDate } from './date'

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
