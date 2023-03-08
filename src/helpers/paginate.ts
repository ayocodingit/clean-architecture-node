export interface PropPaginate {
    page: number
    offset: number
    limit: number
}

export const Paginate = (query: Record<string, any>): PropPaginate => {
    const limit = Number(query.limit) || 100
    const page = Number(query.page) || 1
    const offset = limit * (page - 1)

    return {
        page,
        offset,
        limit,
    }
}

export const Meta = (prop: PropPaginate, count: number) => {
    return {
        page: prop.page,
        last_page: Math.ceil(count / prop.limit),
        limit: prop.limit,
        from: prop.offset + 1,
        to: prop.page * prop.limit,
        total: count,
    }
}
