import Http from '../../transport/http/http'
import Logger from '../../pkg/logger'
import Usecase from './usecase/usecase'
import Handler from './delivery/http/handler'
import { VerifyAuth } from '../../transport/http/middleware/verifyAuth'
import { Config } from '../../config/config.interface'
import Jwt from '../../pkg/jwt'
import { Connection } from '../../database/sequelize/interface'
import Repository from './repository/mysql/repository'
import Sequelize from '../../database/sequelize/sequelize'
// import { Connection } from '../../database/mongo/interface'
// import Repository from './repository/mongo/repository'
// import Mongo from '../../database/mongo/mongo'

class Post {
    private usecase: Usecase

    constructor(
        private logger: Logger,
        private config: Config,
        connection: Connection
    ) {
        // const schema = Mongo.Schema(connection)
        // const repository = new Repository(logger, schema)
        const schema = Sequelize.Schema(connection)
        const repository = new Repository(logger, schema)
        this.usecase = new Usecase(logger, repository)
    }

    public RunHttp(http: Http) {
        const handler = new Handler(this.logger, http, this.usecase)
        this.httpPublic(handler, http)
        this.httpPrivate(handler, http)
        return this
    }

    private httpPublic(handler: Handler, http: Http) {
        const Router = http.Router()

        Router.get('/', handler.Fetch())
        Router.get('/run-cron', handler.Fetch())

        http.SetRouter('/v1/public/posts/', Router)
    }

    public httpPrivate(handler: Handler, http: Http) {
        const Router = http.Router()
        const jwt = new Jwt(this.config.jwt.access_key)

        const auth = VerifyAuth(jwt)

        Router.post('/', handler.Store())

        http.SetRouter('/v1/posts/', auth, Router)
    }
}

export default Post
