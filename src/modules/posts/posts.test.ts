import { Express } from 'express'
import main from '../../main'
import request from 'supertest'
import statusCode from '../../pkg/statusCode'
import { Sequelize } from 'sequelize'
import Usecase from './usecase/usecase'
import Jwt from '../../pkg/jwt'
import config from '../../config/config'

let app: Express
let db: Sequelize

beforeAll(async () => {
    const { http, connection } = await main
    app = http.app
    db = connection
})

afterAll(async () => {
    return db.close()
})

const expectResponseSuccess = expect.objectContaining({
    data: expect.arrayContaining([]),
    meta: expect.objectContaining({}),
})

describe('http test', () => {
    it('test GET endpoint "/v1/public/posts/" success', async () => {
        return request(app)
            .get('/v1/public/posts/')
            .expect(statusCode.OK)
            .then((response) => {
                expect(response.body).toEqual(expectResponseSuccess)
            })
    })
})
describe('http GET test', () => {
    it('test endpoint "/v1/public/posts/" throw', async () => {
        jest.spyOn(Usecase.prototype, 'Fetch').mockImplementation(() => {
            throw new Error('Failed to connect to database')
        })
        return request(app)
            .get('/v1/public/posts/')
            .expect(statusCode.INTERNAL_SERVER_ERROR)
    })
})

describe('http test', () => {
    it('test POST endpoint "/v1/posts/" success', async () => {
        const jwt = new Jwt(config.jwt.access_key)
        const token = jwt.Sign({})
        return request(app)
            .post('/v1/posts/')
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: 'title',
                description: 'description',
            })
            .expect(statusCode.CREATED)
    })
})
describe('http test', () => {
    it('test endpoint "/v1/posts/" throw error not valid body', async () => {
        const jwt = new Jwt(config.jwt.access_key)
        const token = jwt.Sign({})
        return request(app)
            .post('/v1/posts/')
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: 'title',
            })
            .expect(statusCode.UNPROCESSABLE_ENTITY)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        errors: expect.objectContaining({}),
                    })
                )
            })
    })
})