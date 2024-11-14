import Joi from 'joi'

export default Joi.object({
    APP_NAME: Joi.string().required(),
    APP_ENV: Joi.string()
        .valid('local', 'staging', 'production', 'test')
        .default('local'),
    APP_PORT_HTTP: Joi.number().default(3000),
    APP_PREFIX: Joi.string().optional().default(''),
    APP_LOG: Joi.string()
        .valid('info', 'error', 'warn', 'debug')
        .default('info'),

    FILE_MAX: Joi.number().optional().default(10), // MB
    FILE_URI: Joi.string().uri().optional(),

    DB_CONNECTION: Joi.string()
        .valid('mysql', 'postgres')
        .default('mysql')
        .optional(),
    DB_HOST: Joi.string().optional(),
    DB_PORT: Joi.number().optional(),
    DB_USERNAME: Joi.string().optional(),
    DB_PASSWORD: Joi.string().optional(),
    DB_NAME: Joi.string().optional(),
    DB_POOL_MIN: Joi.number().optional().default(0),
    DB_POOL_MAX: Joi.number().optional().default(10),
    DB_POOL_ACQUIRE: Joi.number().optional().default(30000),
    DB_POOL_IDLE: Joi.number().optional().default(30000),
    DB_KEEP_ALIVE: Joi.boolean().optional().default(true),

    JWT_ACCESS_SECRET: Joi.string().optional(),
    JWT_ALGORITHM: Joi.string().default('HS256').optional(),
})
