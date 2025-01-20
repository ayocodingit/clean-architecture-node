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
import { RequestHandler } from 'express'

class Post {
    public usecase: Usecase

    constructor(
        private logger: Logger,
        private config: Config,
        connection: Connection
    ) {
        const schema = Sequelize.Models(connection)
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

        Router.get('/', handler.Fetch as RequestHandler)

        http.SetRouter('/v1/public/posts/', Router)
    }

    public httpPrivate(handler: Handler, http: Http) {
        const Router = http.Router()
        const jwt = new Jwt(this.config.jwt.access_key)

        const auth = VerifyAuth(jwt)

        Router.post('/', handler.Store as RequestHandler)

        http.SetRouter('/v1/posts/', auth, Router)
    }
}

export default Post
