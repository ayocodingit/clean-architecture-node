import mongoose, { Schema } from 'mongoose'
import { Config } from '../../config/config.interface'
import Logger from '../../pkg/logger'
import postSchema from './schemas/post.schema'

class Mongo {
    public static async Connect(logger: Logger, { db }: Config) {
        mongoose.set('strictQuery', false)
        await mongoose
            .connect(`mongodb://${db.host}:${db.port}/${db.name}`, {
                authSource: db.auth_source,
                pass: db.password,
                user: db.username,
            })
            .then(() => {
                logger.Info('Connection to database established')
            })
            .catch((e) => {
                logger.Error(e.message)
                process.exit(-1)
            })

        this.registerSchema(db.name)
    }

    private static registerSchema(database: string) {
        postSchema
    }

    public static Model(collection: string, schema: Schema) {
        return mongoose.model(collection, schema)
    }
}

export default Mongo
