import { Config } from '../../config/config.interface'
import Logger from '../../pkg/logger'
import {
    Sequelize as Client,
    Dialect,
    ModelStatic,
    Model as model,
} from 'sequelize'

export class Sequalize {
    public static async Connect(config: Config, logger: Logger) {
        const { name, username, password, host, connection } = config.db

        const sequelize = new Client(name, username, password, {
            host: host,
            dialect: connection as Dialect,
            logging: (msg) => logger.Debug(msg),
        })
        sequelize
            .authenticate()
            .then(() => {
                logger.Info('Connection has been established successfully.')
            })
            .catch((error: any) => {
                logger.Error('Unable to connect to the database:', error)
                process.exit(-1)
            })
        return sequelize
    }
}

export type Model = ModelStatic<model<any, any>>
