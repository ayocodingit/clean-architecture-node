import Logger from '../../../../pkg/logger'
import { RequestParams } from '../../../../helpers/requestParams'
import { RequestBody } from '../../entity/interface'
import { Model } from '../../../../database/sequelize/sequelize'

class Repository {
    constructor(private logger: Logger, private post: Model) {}

    public async Fetch(request: RequestParams) {
        const { count, rows } = await this.post.findAndCountAll({
            limit: request.limit,
            offset: request.offset,
        })

        return {
            data: rows,
            count,
        }
    }

    public async Store(body: RequestBody) {
        return this.post.create({
            title: body.title,
            description: body.description,
        })
    }
}

export default Repository
