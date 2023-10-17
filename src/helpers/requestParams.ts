export interface RequestParams {
    page: number
    offset: number
    limit: number
    order_by: string
    sort_order: string
    keyword: string
    [key: string]: any
}

export const GetRequestParams = (query: Record<string, any>): RequestParams => {
    const limit = Number(query.limit) || 100
    const page = Number(query.page) || 1
    const offset = limit * (page - 1)
    let { q, sort_order, order_by } = query

    if (!['ASC', 'DESC'].includes(order_by)) {
        order_by = 'ASC'
    }

    return {
        ...query,
        page,
        offset,
        limit,
        sort_order,
        order_by,
        keyword: q,
    }
}

export const GetMeta = (request: RequestParams, count: number) => {
    return {
        page: request.page,
        last_page: Math.ceil(count / request.limit),
        limit: request.limit,
        from: request.offset + 1,
        to: request.page * request.limit,
        total: count,
    }
}
