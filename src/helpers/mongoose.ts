import mongoose from 'mongoose'

export const isValidObjectId = (id: string) => {
    return mongoose.Types.ObjectId.isValid(id)
}

export const filterValidObjectIds = (ids: string[]) =>
    ids.filter(isValidObjectId)
