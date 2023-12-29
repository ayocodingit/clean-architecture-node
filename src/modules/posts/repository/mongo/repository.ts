import Logger from '../../../../pkg/logger'
import { RequestParams } from '../../../../helpers/requestParams'
import { RequestBody } from '../../entity/interface'
import { Schema } from '../../../../database/mongo/interface'

class Repository {
    constructor(private logger: Logger, private schema: Schema) {}

    public async Fetch(request: RequestParams) {
        const data = await this.schema.post
            .find()
            .limit(request.limit)
            .skip(request.offset)
        const count = await this.schema.post.count()
        return {
            data,
            count,
        }
    }

    public async Store(body: RequestBody) {
        const newPost = new this.schema.post({
            title: body.title,
            description: body.description,
        })
        return newPost.save()
    }
}

export default Repository
