import { Connection, Schema } from 'mongoose'
import { Model } from '../interface'

const Post = (connection: Connection) => {
    const schema = new Schema(
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
        {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at',
            },
            versionKey: false,
            toJSON: {
                virtuals: true,
            },
            toObject: {
                virtuals: true,
            },
        }
    )

    return connection.model<Model>('posts', schema)
}

export default Post
