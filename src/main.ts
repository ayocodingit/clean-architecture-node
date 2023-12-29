import config from './config/config'
import Mongo from './database/mongo/mongo'
import { Sequalize } from './database/sequelize/sequelize'
import Posts from './modules/posts/posts'
import Logger from './pkg/logger'
import Http from './transport/http/http'

const main = async () => {
    const logger = new Logger(config)
    // await Mongo.Connect(logger, config)
    const sequelize = await Sequalize.Connect(config, logger)

    const http = new Http(logger, config)

    // Start Load Modules
    new Posts(logger, http, config, sequelize)
    // End Load Modules

    http.Run(config.app.port.http)

    return {
        http,
    }
}

export default main()
