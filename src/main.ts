import config from './config/config'
import Mongo from './database/mongo/mongo'
import Posts from './module/posts/posts'
import Logger from './pkg/logger'
import Http from './transport/http/http'

const main = async () => {
    const logger = new Logger(config)
    await Mongo.Connect(logger, config)
    const http = new Http(logger, config)

    // Start Load Module
    new Posts(logger, http, config)

    // End Load Module

    http.Run(config.app.port.http)

    return {
        http,
    }
}

export default main()
