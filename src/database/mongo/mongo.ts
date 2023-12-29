import mongoose from 'mongoose'
import { Config } from '../../config/config.interface'
import Logger from '../../pkg/logger'
import Post from './schemas/post.schema'
import { Connection } from './interface'

class Mongo {
    public static async Connect(logger: Logger, { db }: Config) {
        mongoose.set('strictQuery', false)
        const connection = mongoose.createConnection(
            `mongodb://${db.host}:${db.port}/${db.name}`,
            {
                authSource: db.auth_source,
                pass: db.password,
                user: db.username,
            }
        )

        connection.once('open', () => {
            logger.Info('Connection to database established')
        })

        // Event handling for connection errors
        connection.on('error', (error) => {
            logger.Error('MongoDB connection error:', error)
            process.exit(-1)
        })

        return connection
    }

    public static Schema = (connection: Connection) => {
        // load all schema on folder schemas
        const post = Post(connection)

        return {
            post,
            // Add other models if needed
        }
    }
}

export default Mongo
