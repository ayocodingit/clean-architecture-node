import Http from '../../../../transport/http/http'
import Logger from '../../../../pkg/logger'
import Usecase from '../../usecase/usecase'
import { NextFunction, Request, Response } from 'express'
import statusCode from '../../../../pkg/statusCode'
import { Meta, Paginate } from '../../../../helpers/paginate'
import { ValidateFormRequest } from '../../../../helpers/validate'
import { RequestSchema } from '../../entity/schema'

class Handler {
    constructor(
        private logger: Logger,
        private http: Http,
        private usecase: Usecase
    ) {}

    public Fetch() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const request = Paginate(req.query)
                const {data, count} = await this.usecase.Fetch(request)
                this.logger.Info(statusCode[statusCode.OK], {
                    additional_info: this.http.AdditionalInfo(
                        req,
                        statusCode.OK
                    ),
                })

                return res.json({ data, meta: Meta(request, count) })
            } catch (error) {
                return next(error)
            }
        }
    }

    public Store() {
        return async (req: any, res: Response, next: NextFunction) => {
            try {
                const body = {
                    ...ValidateFormRequest(RequestSchema, req.body),
                }
                const result = await this.usecase.Store(body)
                this.logger.Info(statusCode[statusCode.CREATED], {
                    additional_info: this.http.AdditionalInfo(
                        req,
                        statusCode.CREATED
                    ),
                })
                return res
                    .status(statusCode.CREATED)
                    .json({ data: result.toJSON(), message: 'CREATED' })
            } catch (error) {
                return next(error)
            }
        }
    }
}

export default Handler
