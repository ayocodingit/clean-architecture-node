import { RequestParams } from '../../../helpers/requestParams'
import Logger from '../../../pkg/logger'
import { RequestBody, RequestQueryFetch } from '../entity/interface'
import Repository from '../repository/mysql/repository'

class Usecase {
    constructor(private logger: Logger, private repository: Repository) {}

    public async Fetch(request: RequestParams<RequestQueryFetch>) {
        const result = await this.repository.Fetch(request)
        return result
    }

    public async Store(body: RequestBody) {
        return this.repository.Store(body)
    }
}

export default Usecase
