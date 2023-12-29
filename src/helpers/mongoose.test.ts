import mongoose from 'mongoose'
import { filterValidObjectIds, isValidObjectId } from './mongoose'

describe('isValidObjectId function', () => {
    it('should return true for a valid ObjectId', () => {
        const validObjectId = new mongoose.Types.ObjectId()
        const result = isValidObjectId(validObjectId.toString())
        expect(result).toBe(true)
    })

    it('should return false for an invalid ObjectId', () => {
        const invalidObjectId = '12345'
        const result = isValidObjectId(invalidObjectId)
        expect(result).toBe(false)
    })
})

describe('filterValidObjectIds function', () => {
    it('should filter out invalid ObjectIds and return only valid ones', () => {
        const mixedIds = [
            'invalidId',
            new mongoose.Types.ObjectId().toHexString(),
            'anotherInvalidId',
            new mongoose.Types.ObjectId().toHexString(),
        ]
        const result = filterValidObjectIds(mixedIds)

        expect(result).toEqual([mixedIds[1], mixedIds[3]])
    })

    it('should return an empty array for an empty input array', () => {
        const result = filterValidObjectIds([])

        expect(result).toEqual([])
    })

    it('should return an empty array if all input ObjectIds are invalid', () => {
        const invalidIds = ['invalidId1', 'invalidId2', 'invalidId3']
        const result = filterValidObjectIds(invalidIds)

        expect(result).toEqual([])
    })

    it('should handle a mix of valid and invalid ObjectIds', () => {
        const mixedIds = [
            'invalidId',
            new mongoose.Types.ObjectId().toHexString(),
            'anotherInvalidId',
            new mongoose.Types.ObjectId().toHexString(),
            'invalidId2',
        ]
        const result = filterValidObjectIds(mixedIds)

        expect(result).toEqual([mixedIds[1], mixedIds[3]])
    })
})
