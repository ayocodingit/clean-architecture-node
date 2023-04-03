import { Translate } from './translate'

describe('test all function in file Translate', () => {
    it('test function Translate', () => {
        const translate = Translate('message', {})
        expect(translate).toEqual('message')
    })
})
