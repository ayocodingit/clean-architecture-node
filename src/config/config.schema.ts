import Joi from 'joi'

export default Joi.object({
    APP_NAME: Joi.string().required(),
    APP_ENV: Joi.string()
        .valid('local', 'staging', 'production')
        .default('local'),
    APP_PORT_HTTP: Joi.number().required(),
    APP_LOG: Joi.string().valid('info', 'error', 'warn', 'debug').required(),
    DB_CONNECTION: Joi.string()
        .valid('mysql', 'postgres', 'mongo')
        .default('mongo'),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_AUTH_SOURCE: Joi.string().when('DB_CONNECTION', {
        is: 'mongo',
        then: Joi.required(),
        otherwise: Joi.optional(),
    }),
    JWT_ACCESS_SECRET: Joi.string().required(),
    JWT_ALGORITHM: Joi.string().default('HS256'),
    REDIS_HOST: Joi.string().optional(),
    REDIS_PORT: Joi.number().optional(),
    REDIS_TTL: Joi.number().optional(),
})
