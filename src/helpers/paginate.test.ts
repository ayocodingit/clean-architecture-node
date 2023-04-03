import { Meta, Paginate } from './paginate'

describe('test all function in file Paginate', () => {
    const expectPaginate = expect.objectContaining({
        limit: expect.any(Number),
        page: expect.any(Number),
        offset: expect.any(Number),
    })

    it('test function Paginate', () => {
        const query = {
            limit: 10,
            page: 1,
        }
        const paginate = Paginate(query)
        expect(paginate).toEqual(expectPaginate)
    })

    it('test function Paginate with not send object limit and page', () => {
        const paginate = Paginate({})
        expect(paginate).toEqual(expectPaginate)
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
        const paginate = Paginate({})
        const meta = Meta(paginate, 10)
        expect(meta).toEqual(expectMetaPaginate)
    })
})
