import express, {
    Express,
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from 'express'
import statusCode from '../../pkg/statusCode'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import { Config } from '../../config/config.interface'
import Error from '../../pkg/error'
import multer from 'multer'
import Logger from '../../pkg/logger'
import rateLimit from 'express-rate-limit'
import { Connection } from '../../database/sequelize/interface'

type responseError = {
    message?: string | object
    errors?: object
}

class Http {
    public app: Express
    public Router = () => express.Router()

    constructor(
        private logger: Logger,
        private config: Config,
        private connection: Connection
    ) {
        this.app = express()
        this.plugins()
        this.ping()
    }

    private plugins() {
        this.app.use(cors())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        this.app.use(helmet())
        this.app.use(compression())
        this.app.disable('x-powered-by')
    }

    private pageNotFound = () => {
        this.app.all('*', (req: Request, res: Response) => {
            return res.status(statusCode.NOT_FOUND).json({
                message: statusCode[statusCode.NOT_FOUND],
            })
        })
    }

    private onError = (
        error: Error,
        req: Request,
        res: Response,
        _: NextFunction
    ) => {
        const resp: responseError = {}
        if (
            error instanceof multer.MulterError &&
            error.code === 'LIMIT_FILE_SIZE'
        ) {
            error.status = statusCode.REQUEST_ENTITY_TOO_LARGE
        }
        const code = Number(error.status) || statusCode.INTERNAL_SERVER_ERROR
        resp.message =
            error.message || statusCode[statusCode.INTERNAL_SERVER_ERROR]

        if (error.isObject) resp.message = JSON.parse(error.message)

        this.logger.Error(error.message, {
            additional_info: this.AdditionalInfo(req, code),
        })

        if (
            code >= statusCode.INTERNAL_SERVER_ERROR &&
            this.config.app.env === 'production'
        ) {
            resp.message = statusCode[statusCode.INTERNAL_SERVER_ERROR]
        }

        if (code === statusCode.UNPROCESSABLE_ENTITY) {
            resp.errors = resp.message as object
            delete resp.message
        }

        return res.status(code).json(resp)
    }

    public AdditionalInfo(req: any, statusCode: number) {
        return {
            env: this.config.app.env,
            http_uri: req.path,
            http_host: this.GetDomain(req),
            http_method: req.method,
            http_scheme: req.protocol,
            remote_addr: req.httpVersion,
            user_agent: req.headers['user-agent'],
            origin: req.headers['origin'] || 'unknown',
            tz: new Date(),
            code: statusCode,
            user: req.user || {},
        }
    }

    public GetDomain(req: Request) {
        const protocol = req.protocol
        const host = req.get('host')
        return `${protocol}://${host}`
    }

    public SetRouter(prefix: string, ...router: RequestHandler[]) {
        this.app.use(this.config.app.prefix + prefix, router)
    }

    private ping = () => {
        const router = this.Router()

        router.get('/', async (req: Request, res: Response) => {
            // test connection to database
            await this.connection.query('SELECT 1+1 AS result')

            this.logger.Info('OK', {
                additional_info: this.AdditionalInfo(req, res.statusCode),
            })

            return res.json({
                app_name: this.config.app.name,
            })
        })

        this.SetRouter('/', router)
    }

    public Upload(fieldName: string) {
        const upload = multer({
            limits: {
                fileSize: this.config.file.max,
            },
            storage: multer.memoryStorage(),
        })

        return upload.single(fieldName)
    }

    public RateLimiter(
        durationInMs: number,
        maxRetry: number,
        skipSuccessfulRequests: boolean = false
    ) {
        return rateLimit({
            windowMs: durationInMs,
            max: maxRetry,
            handler: (req: any, response) => {
                const { resetTime } = req.rateLimit
                return response.status(statusCode.TOO_MANY_REQUESTS).json({
                    error: statusCode[statusCode.TOO_MANY_REQUESTS],
                    reset_time: resetTime,
                })
            },
            skipSuccessfulRequests,
        })
    }

    public Run(port: number) {
        this.pageNotFound()
        this.app.use(this.onError)
        if (this.config.app.env !== 'test') {
            this.app.listen(port, () => {
                this.logger.Info(
                    `Server http is running at http://localhost:${port}`
                )
            })
        }
    }
}

export default Http
