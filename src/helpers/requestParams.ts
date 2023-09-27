export interface RequestParams {
    page: number
    offset: number
    limit: number
    [key: string]: any
}

export const GetRequestParams = (query: Record<string, any>): RequestParams => {
    const limit = Number(query.limit) || 100
    const page = Number(query.page) || 1
    const offset = limit * (page - 1)

    return {
        ...query,
        page,
        offset,
        limit,
    }
}

export const GetMeta = (req: RequestParams, count: number) => {
    return {
        page: req.page,
        last_page: Math.ceil(count / req.limit),
        limit: req.limit,
        from: req.offset + 1,
        to: req.page * req.limit,
        total: count,
    }
}
