import express, { Express, NextFunction, Request, Response } from 'express'
import statusCode from '../../pkg/statusCode'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import { Config } from '../../config/config.interface'
import Error from '../../pkg/error'
import multer from 'multer'
import Logger from '../../pkg/logger'

class Http {
    private app: Express
    public dest: string = '.'

    constructor(private logger: Logger, private config: Config) {
        this.app = express()
        this.plugins()
        this.pageHome()
    }

    private plugins() {
        this.app.use(cors())
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
        next: NextFunction
    ) => {
        const resp: Record<string, any> = {}
        const code = Number(error.status) || 500
        resp.error =
            error.message || statusCode[statusCode.INTERNAL_SERVER_ERROR]

        if (error.isObject) resp.error = JSON.parse(resp.error)

        this.logger.Error(error.message, {
            additional_info: this.AdditionalInfo(req, resp.code),
        })

        if (
            code >= statusCode.INTERNAL_SERVER_ERROR &&
            this.config.app.env === 'production'
        ) {
            resp.error = statusCode[statusCode.INTERNAL_SERVER_ERROR]
        }

        if (code === statusCode.UNPROCESSABLE_ENTITY) {
            resp.errors = resp.error
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

    public SetRouter(prefix: string, ...router: any) {
        this.app.use(prefix, router)
    }

    private pageHome = () => {
        this.app.get('/', (req: Request, res: Response) => {
            this.logger.Info('OK', {
                additional_info: this.AdditionalInfo(req, res.statusCode),
            })
            res.status(statusCode.OK).json({
                app_name: this.config.app.name,
            })
        })
    }

    public Upload(fieldName: string) {
        const upload = multer({ dest: this.dest })
        return upload.single(fieldName)
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
