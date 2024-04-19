import Http from '../../../../transport/http/http'
import Logger from '../../../../pkg/logger'
import Usecase from '../../usecase/usecase'
import { NextFunction, Response } from 'express'
import statusCode from '../../../../pkg/statusCode'
import { GetMeta, GetRequest } from '../../../../helpers/requestParams'
import { ValidateFormRequest } from '../../../../helpers/validate'
import { Store } from '../../entity/schema'
import { RequestQueryFetch } from '../../entity/interface'

class Handler {
    constructor(
        private logger: Logger,
        private http: Http,
        private usecase: Usecase
    ) {}

    public Fetch = async (req: any, res: Response, next: NextFunction) => {
        try {
            const request = GetRequest<RequestQueryFetch>(req.query)
            const { data, count } = await this.usecase.Fetch(request)
            this.logger.Info(statusCode[statusCode.OK], {
                additional_info: this.http.AdditionalInfo(req, statusCode.OK),
            })

            return res.json({ data, meta: GetMeta(request, count) })
        } catch (error) {
            return next(error)
        }
    }

    public Store = async (req: any, res: Response, next: NextFunction) => {
        try {
            const body = ValidateFormRequest(Store, req.body)
            const result = await this.usecase.Store(body)
            this.logger.Info(statusCode[statusCode.CREATED], {
                additional_info: this.http.AdditionalInfo(
                    req,
                    statusCode.CREATED
                ),
            })
            return res
                .status(statusCode.CREATED)
                .json({ data: result, message: 'CREATED' })
        } catch (error) {
            return next(error)
        }
    }
}

export default Handler
