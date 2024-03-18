type RequestMeta = {
    page: number
    offset: number
    limit: number
}

type RequestDefault = {
    order_by: string
    sort_order: string
    keyword: string
    q: string
}

export type RequestParams<T> = RequestDefault & RequestMeta & T

export const GetRequest = <T = any>(query: RequestParams<T>): RequestParams<T> => {
    const limit = Number(query.limit) || 10
    const page = Number(query.page) || 1
    const offset = limit * (page - 1)
    let { q, sort_order, order_by } = query

    if (!['asc', 'desc'].includes(order_by)) {
        order_by = 'asc'
    }

    const request: RequestParams<T> = {
        ...query,
        page,
        offset,
        limit,
        sort_order,
        order_by,
        keyword: q,
    }

    return request
}

export const GetMeta = (request: RequestMeta, count: number) => {
    return {
        page: request.page,
        last_page: Math.ceil(count / request.limit),
        limit: request.limit,
        from: request.offset + 1,
        to: request.page * request.limit,
        total: count,
    }
}
