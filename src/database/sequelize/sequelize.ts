import { Config } from '../../config/config.interface'
import Logger from '../../pkg/logger'
import { Sequelize as createConnection, Dialect } from 'sequelize'
import Post from './schemas/post.schema'
import { Connection } from './interface'

class Sequalize {
    public static async Connect(config: Config, logger: Logger) {
        const {
            name,
            username,
            password,
            host,
            connection: dialect,
            pool,
        } = config.db

        const connection = new createConnection(name, username, password, {
            host: host,
            dialect: dialect as Dialect,
            logging: false,
            pool: {
                min: pool.min,
                max: pool.max,
                acquire: pool.acquire,
                idle: pool.idle,
            },
        })

        try {
            await connection.authenticate()
            logger.Info('Sequelize connection to database established')
        } catch (error) {
            logger.Error('Sequelize connection error:', error)
            process.exit(-1)
        }

        return connection
    }

    public static Schema = (connection: Connection) => {
        // load all schema on folder schemas
        const post = Post(connection)

        // setup relation for eager loader in here
        // example: User.hasOne(Profile)
        return {
            post,
            // Add other models if needed
        }
    }
}

export default Sequalize
