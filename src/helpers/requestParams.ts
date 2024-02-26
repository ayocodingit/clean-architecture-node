export type RequestParamsDefault = {
    page: number
    offset: number
    limit: number
    order_by: string
    sort_order: string
    keyword: string
    q: string
}

export type RequestParams<T> = T & RequestParamsDefault

export const GetRequestParams = <T>(
    query: RequestParams<T>
): RequestParams<T> => {
    const limit = Number(query.limit) || 10
    const page = Number(query.page) || 1
    const offset = limit * (page - 1)
    let { q, sort_order, order_by } = query

    if (!['asc', 'desc'].includes(order_by)) {
        order_by = 'asc'
    }

    const requestParams: RequestParams<T> = {
        ...query,
        page,
        offset,
        limit,
        sort_order,
        order_by,
        keyword: q,
    }

    return requestParams
}

export const GetMeta = (request: RequestParamsDefault, count: number) => {
    return {
        page: request.page,
        last_page: Math.ceil(count / request.limit),
        limit: request.limit,
        from: request.offset + 1,
        to: request.page * request.limit,
        total: count,
    }
}
