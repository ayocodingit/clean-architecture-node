import config from './config/config'
import Mongo from './database/mongo/mongo'
import Posts from './internal/posts/posts'
import Logger from './pkg/logger'
import Http from './transport/http/http'

const main = async () => {
    const logger = new Logger(config)
    await Mongo.Connect(logger, config)
    const http = new Http(logger, config)

    // Load App Internal
    new Posts(logger, http)

    // Run Transport
    http.Run(config.app.port.http)

    return {
        http,
    }
}

export default main()
