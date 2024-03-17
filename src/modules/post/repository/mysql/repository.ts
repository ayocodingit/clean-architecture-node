import Logger from '../../../../pkg/logger'
import { RequestParams } from '../../../../helpers/requestParams'
import {
    SchemaRepository,
    RequestBody,
    RequestQueryFetch,
    Fetch,
    Store,
} from '../../entity/interface'
import { Schema } from '../../../../database/sequelize/interface'

class Repository implements SchemaRepository {
    constructor(private logger: Logger, private schema: Schema) {}

    public async Fetch(
        request: RequestParams<RequestQueryFetch>
    ): Promise<Fetch> {
        const { count, rows } = await this.schema.post.findAndCountAll({
            limit: request.limit,
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
