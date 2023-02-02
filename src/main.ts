import config from './config/config'
import Mongo from './database/mongo/mongo'
import Logger from './pkg/logger'
import Redis from './pkg/redis'
import Http from './transport/http/http'

const main = async () => {
    const { logger } = new Logger(config)
    await Mongo.connect(logger, config)
    const redis = new Redis(config, logger)
    const http = new Http(logger, config)

    if (config.app.env !== 'test') {
        http.Run(config.app.port.http)
    }

    return {
        http,
    }
}

export default main()
