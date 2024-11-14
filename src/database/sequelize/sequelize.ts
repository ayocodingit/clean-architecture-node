import { Config } from '../../config/config.interface'
import Logger from '../../pkg/logger'
import { Sequelize as createConnection, Dialect, Op } from 'sequelize'
import Post from './models/post'
import { Connection } from './interface'

class Sequalize {
    public static async Connect({ db }: Config, logger: Logger) {
        const connection = new createConnection({
            logging: false,
            dialect: db.connection as Dialect,
            username: db.username,
            password: db.password,
            host: db.host,
            port: db.port,
            database: db.name,
            pool: {
                min: db.pool.min,
                max: db.pool.max,
                acquire: db.pool.acquire,
                idle: db.pool.idle,
            },
        })

        try {
            await connection.authenticate()
            logger.Info('Sequelize connection to database established')
        } catch (error: any) {
            logger.Error('Sequelize connection error: ' + error.message)
            process.exit(-1)
        }

        return connection
    }

    public static Models = (connection: Connection) => {
        // load all model on folder models
        const post = Post(connection)

        // setup relation for eager loader in here
        // example: User.hasOne(Profile)
        return {
            post,
            // Add other models if needed
            // ...

            // Add other require of the driver database
            connection,
            Op,
        }
    }

    public static Disconnect = (connection: Connection) => {
        return connection.close()
    }
}

export default Sequalize
