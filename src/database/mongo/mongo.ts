import mongoose from 'mongoose'
import { Config } from '../../config/config.interface'
import Logger from '../../pkg/logger'
import Post from './schemas/post.schema'
import { Connection } from './interface'

class Mongo {
    public static async Connect(logger: Logger, { db }: Config) {
        const uri =
            db.uri ||
            `mongodb://${db.username}:${db.password}@${db.host}:${db.port}/${db.name}?authSource=${db.auth_source}`
        mongoose.set('strictQuery', false)
        try {
            await mongoose.connect(uri, {
                keepAlive: db.keep_alive,
                maxPoolSize: db.pool.max,
                minPoolSize: db.pool.min,
                maxIdleTimeMS: db.pool.idle,
                keepAliveInitialDelay: db.pool.acquire,
            })
            logger.Info('MongoDB connection to database established')
            const connection = mongoose.connection
            return connection
        } catch (error) {
            logger.Error('MongoDB connection error:', error)
            process.exit(-1)
        }
    }

    public static Schema = (connection: Connection) => {
        // load all schema on folder schemas
        const post = Post(connection)

        return {
            post,
            // Add other models if needed
            // ...

            // Add other require of the driver database
            connection,
        }
    }
}

export default Mongo
