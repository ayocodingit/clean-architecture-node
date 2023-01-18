import mongoose from 'mongoose'
import winston from 'winston'
import { Config } from '../../config/config.interface'

class Mongo {
    constructor(logger: winston.Logger, { database }: Config) {
        mongoose.set('strictQuery', false)
        mongoose
            .connect(
                `mongodb://${database.host}:${database.port}/${database.database}`,
                {
                    authSource: 'admin',
                    pass: database.password,
                    user: database.username,
                }
            )
            .then(() => {
                logger.info('Connection to database established')
            })
            .catch((e) => {
                logger.error(e.message)
                process.exit(-1)
            })
    }
}

export default Mongo
