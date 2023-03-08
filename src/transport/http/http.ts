import express, { Express, NextFunction, Request, Response } from 'express'
import winston from 'winston'
import statusCode from '../../pkg/statusCode'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import { Config } from '../../config/config.interface'
import jwt from 'jsonwebtoken'
import Error from '../../pkg/error'

class Http {
    public app: Express

    constructor(private logger: winston.Logger, private config: Config) {
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
        this.app.get('*', (_: Request, res: Response) => {
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
        resp.code = error.status || 500
        resp.error =
            error.message || statusCode[statusCode.INTERNAL_SERVER_ERROR]

        if (error.isObject) resp.error = JSON.parse(resp.error)

        if (resp.code >= statusCode.INTERNAL_SERVER_ERROR) {
            this.logger.error(resp.error, {
                env: this.config.app.env,
            })
            resp.error = statusCode[statusCode.INTERNAL_SERVER_ERROR]
        }

        if (resp.code === statusCode.UNPROCESSABLE_ENTITY) {
            resp.errors = resp.error
            delete resp.error
        }

        return res.status(resp.code).json(resp)
    }

    private pageHome = () => {
        this.app.get('/', (_: Request, res: Response) => {
            res.status(statusCode.OK).json({
                app_name: this.config.app.name,
            })
        })
    }

    public Run(port: number) {
        this.pageNotFound()
        this.app.use(this.onError)
        this.app.listen(port, () => {
            this.logger.info(
                `Server http is running at http://localhost:${port}`
            )
        })
    }
}

export default Http
