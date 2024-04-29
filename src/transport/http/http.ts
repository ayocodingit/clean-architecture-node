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
import error from '../../pkg/error'
import config from '../../config/config'

type responseError = {
    error?: string | object
    errors?: object
}

class Http {
    public app: Express
    public dest: string = '.'

    constructor(private logger: Logger, private config: Config) {
        this.app = express()
        this.plugins()
        this.ping()
    }

    private loadCors() {
        return cors({
            origin: function (origin, callback) {
                const whitelist = config.app.cors
                const isValidCors = (origin?: string) => {
                    if (!origin) return false

                    for (const value of whitelist) {
                        if (value.test(origin)) {
                            return true
                        }
                    }

                    return false
                }

                if (whitelist.length === 0 || isValidCors(origin)) {
                    return callback(null, true)
                }

                return callback(
                    new error(statusCode.FORBIDDEN, 'Not allowed by CORS')
                )
            },
        })
    }

    private plugins() {
        this.app.use(this.loadCors())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        this.app.use(helmet())
        this.app.use(compression())
    }

    private pageNotFound = () => {
        this.app.all('*', (_: Request, res: Response) => {
            throw new Error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )
        })
    }

    private onError = (
        error: Error,
        req: Request,
        res: Response,
        _: NextFunction
    ) => {
        const resp: responseError = {}
        const code = Number(error.status) || statusCode.INTERNAL_SERVER_ERROR
        resp.error =
            error.message || statusCode[statusCode.INTERNAL_SERVER_ERROR]

        if (error.isObject) resp.error = JSON.parse(error.message)

        this.logger.Error(error.message, {
            error: {
                message: error.message,
            },
            additional_info: this.AdditionalInfo(req, code),
        })

        if (
            code >= statusCode.INTERNAL_SERVER_ERROR &&
            this.config.app.env === 'production'
        ) {
            resp.error = statusCode[statusCode.INTERNAL_SERVER_ERROR]
        }

        if (code === statusCode.UNPROCESSABLE_ENTITY) {
            resp.errors = resp.error as object
            delete resp.error
        }

        return res.status(code).json(resp)
    }

    public AdditionalInfo(req: any, statusCode: number) {
        return {
            env: this.config.app.env,
            http_uri: req.originalUrl,
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
        let protocol = req.protocol
        if (this.config.app.env !== 'local') protocol = 'https'
        return protocol + '://' + req.headers.host
    }

    public Router() {
        return express.Router()
    }

    public SetRouter(prefix: string, ...router: RequestHandler[]) {
        this.app.use(prefix, router)
    }

    private ping = () => {
        this.app.get('/', (req: Request, res: Response) => {
            this.logger.Info('OK', {
                additional_info: this.AdditionalInfo(req, res.statusCode),
            })
            return res.json({
                app_name: this.config.app.name,
            })
        })
    }

    public Upload(fieldName: string) {
        const upload = multer({
            dest: this.dest,
            limits: {
                fileSize: this.config.file.max,
            },
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
