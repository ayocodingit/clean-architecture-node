import config from './config/config'
import Mongo from './database/mongo/mongo'
import Posts from './modules/posts/posts'
import Jwt from './pkg/jwt'
import Logger from './pkg/logger'
import Http from './transport/http/http'

const main = async () => {
    const logger = new Logger(config)
    await Mongo.Connect(logger, config)
    const http = new Http(logger, config)
    const jwt = new Jwt(config)

    // Start Load Modules
    new Posts(logger, http, config, jwt)
    // End Load Modules

    http.Run(config.app.port.http)

    return {
        http,
    }
}

export default main()
