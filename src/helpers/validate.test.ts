import Joi from 'joi'
import statusCode from '../pkg/statusCode'
import { Validate, ValidateFormRequest, ValidateParams } from './validate'

const password = Date.now().toString()

describe('test all function in file Validate', () => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
    it('test function validate no error', () => {
        const { value, errors } = Validate(schema, {
            username: 'test',
            password,
        })
        expect(value).toEqual(
            expect.objectContaining({
                username: expect.any(String),
                password: expect.any(String),
            })
        )

        expect(errors).toBeUndefined()
    })
    it('test function validate with error username not defined', () => {
        const { errors, value } = Validate(schema, {
            password,
        })

        expect(value).toEqual(
            expect.objectContaining({
                password,
            })
        )

        expect(errors).toEqual(
            expect.objectContaining({
                username: 'username is required',
            })
        )
    })

    it('test function ValidateFormRequest', () => {
        const value = ValidateFormRequest(schema, {
            username: 'test',
            password,
        })

        expect(value).toEqual(
            expect.objectContaining({
                username: expect.any(String),
                password: expect.any(String),
            })
        )
    })

    it('test function validate From Request with error username not defined', () => {
        try {
            ValidateFormRequest(schema, {
                password,
            })
        } catch (error) {
            expect(error).toHaveProperty('message', expect.any(String))
            expect(error).toHaveProperty(
                'status',
                statusCode.UNPROCESSABLE_ENTITY
            )
        }
    })
})

describe('test all function in file Validate', () => {
    const schema = Joi.string().required()
    it('test function ValidateParams', () => {
        const value = ValidateParams(schema, 'test')
        expect(value).toEqual('test')
    })
    it('test function ValidateParams with error', () => {
        try {
            ValidateParams(schema, '')
        } catch (error) {
            expect(error).toHaveProperty('message', expect.any(String))
            expect(error).toHaveProperty('status', statusCode.BAD_REQUEST)
        }
    })
})
