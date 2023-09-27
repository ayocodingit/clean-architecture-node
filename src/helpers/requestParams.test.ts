import { GetMeta, GetRequestParams } from './requestParams'

describe('test all function in file Request Params', () => {
    const expectRequestParams = expect.objectContaining({
        limit: expect.any(Number),
        page: expect.any(Number),
        offset: expect.any(Number),
    })

    it('test function GetRequestParams', () => {
        const query = {
            limit: 10,
            page: 1,
        }
        const req = GetRequestParams(query)
        expect(req).toEqual(expectRequestParams)
    })

    it('test function Paginate with not send object limit and page', () => {
        const req = GetRequestParams({})
        expect(req).toEqual(expectRequestParams)
    })
})

describe('test all function in file Paginate', () => {
    const expectMetaPaginate = expect.objectContaining({
        page: expect.any(Number),
        last_page: expect.any(Number),
        limit: expect.any(Number),
        from: expect.any(Number),
        to: expect.any(Number),
        total: expect.any(Number),
    })
    it('test function Meta from pagination', () => {
        const paginate = GetRequestParams({})
        const meta = GetMeta(paginate, 10)
        expect(meta).toEqual(expectMetaPaginate)
    })
})
