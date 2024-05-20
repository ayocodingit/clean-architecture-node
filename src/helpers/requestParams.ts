type RequestMeta = {
    page: number
    offset: number
    per_page: number
}

type RequestDefault = {
    sort_by: string
    sort_order: string
    keyword: string
    q: string
}

export type RequestParams<T> = RequestDefault & RequestMeta & T

export const GetRequest = <T = any>(
    query: RequestParams<T>
): RequestParams<T> => {
    const per_page = Number(query.per_page) || 10
    const page = Number(query.page) || 1
    const offset = per_page * (page - 1)
    let { q, sort_order, sort_by } = query

    if (!['asc', 'desc'].includes(sort_order)) {
        sort_order = 'asc'
    }

    const request: RequestParams<T> = {
        ...query,
        page,
        offset,
        per_page,
        sort_order,
        sort_by,
        keyword: q,
    }

    return request
}

export const GetMeta = (request: RequestMeta, count: number) => {
    const last_page = Math.ceil(count / request.per_page)
    return {
        current_page: request.page,
        last_page,
        per_page: request.per_page,
        from: request.offset + 1,
        to: request.page * request.per_page,
        total: count,
        has_next: request.page < last_page,
        has_prev: request.offset > 1,
    }
}
