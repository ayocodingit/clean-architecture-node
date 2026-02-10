import PostRepository from '../../../database/repository/post/post'
import { RequestParams } from '../../../helpers/requestParams'
import Logger from '../../../pkg/logger'
import { RequestBody, RequestQueryFetch } from '../entity/interface'

class Usecase {
    constructor(
        private logger: Logger,
        private postRepository: PostRepository
    ) {}

    public async Fetch(request: RequestParams<RequestQueryFetch>) {
        const result = await this.postRepository.Fetch(request)
        return result
    }

    public async Store(body: RequestBody) {
        return this.postRepository.Store(body)
    }
}

export default Usecase
