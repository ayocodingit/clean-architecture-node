import Logger from '../../../pkg/logger'
import { RequestBody } from '../entity/interface'
import Repository from '../repository/mongo/repository'

class Usecase {
    constructor(private logger: Logger, private repository: Repository) {}

    public async Fetch(request: any) {
        const data = await this.repository.Fetch(request)
        const count = await this.repository.Count()
        return {
            data,
            count,
        }
    }

    public async Store(body: RequestBody) {
        return this.repository.Store(body)
    }
}

export default Usecase
