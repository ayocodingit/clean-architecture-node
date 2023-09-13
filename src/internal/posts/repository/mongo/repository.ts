import Logger from '../../../../pkg/logger'
import postSchema from '../../../../database/mongo/schemas/post.schema'
import { PropPaginate } from '../../../../helpers/paginate'
import { RequestBody } from '../../entity/interface'

class Repository {
    constructor(private logger: Logger, private post: typeof postSchema) {}

    public async Fetch(request: PropPaginate) {
        return this.post.find().limit(request.limit).skip(request.offset)
    }

    public async Count() {
        return this.post.count()
    }

    public async Store(body: RequestBody) {
        const newPost = new this.post({
            title: body.title,
            description: body.description,
        })
        return newPost.save()
    }
}

export default Repository
