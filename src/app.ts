import config from './config/config'
// import Mongo from './database/mongo/mongo'
import Sequelize from './database/sequelize/sequelize'
import Post from './modules/post/post'
import Logger from './pkg/logger'
import Http from './transport/http/http'

const Run = async () => {
    const logger = new Logger(config)
    // const connection = await Mongo.Connect(logger, config)
    const connection = await Sequelize.Connect(config, logger)

    const http = new Http(logger, config)

    // Start Load Modules
    new Post(logger, config, connection).RunHttp(http)
    // End Load Modules

    http.Run(config.app.port.http)

    return {
        http,
        connection,
    }
}

export default Run()
