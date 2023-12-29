import Logger from '../../../pkg/logger'
import { RequestBody } from '../entity/interface'
// import Repository from '../repository/mongo/repository'
import Repository from '../repository/mysql/repository'

class Usecase {
    constructor(private logger: Logger, private repository: Repository) {}

    public async Fetch(request: any) {
        const result = await this.repository.Fetch(request)
        return result
    }

    public async Store(body: RequestBody) {
        return this.repository.Store(body)
    }
}

export default Usecase
