import { GetMeta, GetRequest } from './requestParams'

describe('test all function in file Request Params', () => {
    const expectRequestParams = expect.objectContaining({
        per_page: expect.any(Number),
        page: expect.any(Number),
        offset: expect.any(Number),
    })

    it('test function GetRequest', () => {
        const query: any = {
            per_page: 10,
            page: 1,
        }
        const req = GetRequest<{}>(query)
        expect(req).toEqual(expectRequestParams)
    })

    it('test function Paginate with not send object per_page and page', () => {
        const query: any = {
            per_page: 10,
            page: 1,
        }
        const req = GetRequest<{}>(query)
        expect(req).toEqual(expectRequestParams)
    })
})

describe('test all function in file Paginate', () => {
    const expectMetaPaginate = expect.objectContaining({
        last_page: expect.any(Number),
        current_page: expect.any(Number),
        from: expect.any(Number),
        to: expect.any(Number),
        total: expect.any(Number),
        has_next: expect.any(Boolean),
        has_prev: expect.any(Boolean),
    })
    it('test function Meta from pagination', () => {
        const query: any = {
            per_page: 10,
            page: 1,
        }
        const paginate = GetRequest<{}>(query)
        const meta = GetMeta(paginate, 10)
        expect(meta).toEqual(expectMetaPaginate)
    })
})
