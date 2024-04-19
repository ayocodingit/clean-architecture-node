import Logger from '../../../../pkg/logger'
import { RequestParams } from '../../../../helpers/requestParams'
import {
    SchemaRepository,
    RequestBody,
    RequestQueryFetch,
    Fetch,
    Store,
} from '../../entity/interface'
import { Schema } from '../../../../database/mongo/interface'

class Repository implements SchemaRepository {
    constructor(private logger: Logger, private schema: Schema) {}

    public async Fetch(
        request: RequestParams<RequestQueryFetch>
    ): Promise<Fetch> {
        const data = await this.schema.post
            .find()
            .limit(request.per_page)
            .skip(request.offset)
        const count = await this.schema.post.count()
        return {
            data,
            count,
        }
    }

    public async Store(body: RequestBody): Promise<Store> {
        const newPost = new this.schema.post({
            title: body.title,
            description: body.description,
        })
        return newPost.save()
    }
}

export default Repository
