import { GetDomain, RemoveProcotol } from './http'

describe('test all function in file http', () => {
    it('test a function Remove Protocol', () => {
        const url = RemoveProcotol('http://localhost:3000')
        expect(url).toEqual('localhost:3000')
    })
})

describe('test all function in file http', () => {
    it('test a function Get Domain', () => {
        const url = GetDomain('localhost', 'test')
        expect(url).toEqual('localhost.test')
    })
})
