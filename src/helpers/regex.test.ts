import {
    RegexWordScript,
    RegexSubdomain,
    RegexSanitize,
    RegexObjectID,
    RegexContentTypeImage,
} from './regex'

describe('RegexWordScript', () => {
    test('should not match "script"', () => {
        expect(RegexWordScript.test('script')).toBe(false)
    })

    test('should match valid words', () => {
        expect(RegexWordScript.test('validWord')).toBe(true)
        expect(RegexWordScript.test('anotherWord')).toBe(true)
    })
})

describe('RegexSubdomain', () => {
    test('should match valid subdomains', () => {
        expect(RegexSubdomain.test('example')).toBe(true)
        expect(RegexSubdomain.test('sub-domain')).toBe(true)
        expect(RegexSubdomain.test('123')).toBe(true)
    })

    test('should not match invalid subdomains', () => {
        expect(RegexSubdomain.test('Invalid Subdomain')).toBe(false)
        expect(RegexSubdomain.test('sub_domain')).toBe(false)
        expect(RegexSubdomain.test('invalid@subdomain')).toBe(false)
    })
})

describe('RegexSanitize', () => {
    test('should match valid sanitized strings', () => {
        expect(RegexSanitize.test('Valid String 123,.-()\'"&')).toBe(true)
        expect(RegexSanitize.test('Another String')).toBe(true)
    })

    test('should not match invalid sanitized strings', () => {
        expect(RegexSanitize.test('Invalid_String@123')).toBe(false)
        expect(RegexSanitize.test('Invalid!@#String')).toBe(false)
    })
})

describe('RegexObjectID Test', () => {
    test('Valid ObjectID should match the regex', () => {
        const validObjectID = '5f63a32b49ce3c4a8c4d8d1a'
        expect(validObjectID).toMatch(RegexObjectID)
    })

    test('Invalid ObjectID should not match the regex', () => {
        const invalidObjectID = 'invalidObjectID'
        expect(invalidObjectID).not.toMatch(RegexObjectID)
    })

    test('Empty string should not match the regex', () => {
        const emptyString = ''
        expect(emptyString).not.toMatch(RegexObjectID)
    })
})

describe('RegexContentTypeImage', () => {
    it('should match valid image content type', () => {
        const validContentTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/svg+xml',
        ]

        validContentTypes.forEach((contentType) => {
            expect(RegexContentTypeImage.test(contentType)).toBe(true)
        })
    })

    it('should not match invalid content types', () => {
        const invalidContentTypes = [
            'text/plain',
            'application/json',
            'image',
            '',
        ]

        invalidContentTypes.forEach((contentType) => {
            expect(RegexContentTypeImage.test(contentType)).toBe(false)
        })
    })
})
