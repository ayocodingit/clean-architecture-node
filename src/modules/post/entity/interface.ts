import { Post } from '../../../database/entity'

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
