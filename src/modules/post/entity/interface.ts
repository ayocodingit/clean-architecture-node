import { Post } from '../../../database/entity'
import { RequestParams } from '../../../helpers/requestParams'

// define for type data
export type RequestBody = {
    title: string
    description: string
}

export type RequestQueryFetch = {
    start_date: string
}

export type Fetch = {
    data: Post[]
    count: number
}

export type Store = Post

// define for type Schema for Repository
export type SchemaRepository = {
    Fetch(request: RequestParams<RequestQueryFetch>): Promise<Fetch>
    Store(body: RequestBody): Promise<Store>
}
