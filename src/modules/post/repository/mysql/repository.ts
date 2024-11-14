import Logger from '../../../../pkg/logger'
import { RequestParams } from '../../../../helpers/requestParams'
import {
    RequestBody,
    RequestQueryFetch,
    Fetch,
    Store,
} from '../../entity/interface'
import { Schema } from '../../../../database/sequelize/interface'

class Repository {
    constructor(private logger: Logger, private schema: Schema) {}

    public async Fetch(
        request: RequestParams<RequestQueryFetch>
    ): Promise<Fetch> {
        const { count, rows } = await this.schema.post.findAndCountAll({
            limit: request.per_page,
            offset: request.offset,
        })

        return {
            data: rows,
            count,
        }
    }

    public async Store(body: RequestBody): Promise<Store> {
        return this.schema.post.create({
            title: body.title,
            description: body.description,
        })
    }
}

export default Repository
