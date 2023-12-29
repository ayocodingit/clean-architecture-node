import Http from '../../transport/http/http'
// import Repository from './repository/mongo/repository'
import Logger from '../../pkg/logger'
// import postSchema from '../../database/mongo/schemas/post.schema'
import Usecase from './usecase/usecase'
import Handler from './delivery/http/handler'
import { VerifyAuth } from '../../transport/http/middleware/verifyAuth'
import { Config } from '../../config/config.interface'
import Jwt from '../../pkg/jwt'
import Post from '../../database/sequelize/schemas/post.schema'
import Repository from './repository/mysql/repository'
import { Sequelize } from 'sequelize'

class Posts {
    constructor(
        private logger: Logger,
        private http: Http,
        private config: Config,
        sequelize: Sequelize
    ) {
        // const repository = new Repository(logger, postSchema)
        const repository = new Repository(logger, Post(sequelize))
        const usecase = new Usecase(logger, repository)
        this.loadHttp(usecase)
    }

    private loadHttp(usecase: Usecase) {
        const handler = new Handler(this.logger, this.http, usecase)
        this.httpPublic(handler)
        this.httpPrivate(handler)
    }

    private httpPublic(handler: Handler) {
        const Router = this.http.Router()

        Router.get('/', handler.Fetch())

        this.http.SetRouter('/v1/public/posts/', Router)
    }

    public httpPrivate(handler: Handler) {
        const Router = this.http.Router()
        const jwt = new Jwt(this.config.jwt.access_key)

        const auth = VerifyAuth(jwt)

        Router.post('/', handler.Store())

        this.http.SetRouter('/v1/posts/', auth, Router)
    }
}

export default Posts
