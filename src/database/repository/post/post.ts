import Logger from '../../../pkg/logger'
import { RequestParams } from '../../../helpers/requestParams'
import { Schema } from '../../../database/sequelize/interface'
import { FilterPostDto, PostDto } from './dto'

class PostRepository {
    constructor(private logger: Logger, private schema: Schema) {}

    public async Fetch(request: RequestParams<FilterPostDto>) {
        const { count, rows } = await this.schema.post.findAndCountAll({
            limit: request.per_page,
            offset: request.offset,
        })

        return {
            data: rows,
            count,
        }
    }

    public async Store(body: PostDto) {
        return this.schema.post.create({
            title: body.title,
            description: body.description,
        })
    }
}

export default PostRepository
