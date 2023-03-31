import config from './config/config'
import Mongo from './database/mongo/mongo'
import Logger from './pkg/logger'
import Http from './transport/http/http'

const main = async () => {
    const { logger } = new Logger(config)
    await Mongo.connect(logger, config)
    const http = new Http(logger, config)

    // Load App Internal

    // Run Transport
    http.Run(config.app.port.http)

    return {
        http,
    }
}

export default main()
