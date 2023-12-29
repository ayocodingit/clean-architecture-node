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

class Posts {
    constructor(
        private logger: Logger,
        private http: Http,
        private config: Config,
        connection: Connection
    ) {
        // const schema = Mongo.Schema(connection)
        // const repository = new Repository(logger, schema)
        const schema = Sequelize.Schema(connection)
        const repository = new Repository(logger, schema)
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
