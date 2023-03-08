import dotenv from 'dotenv'
import { Config } from './config.interface'
import configValidate from './config.validate'

dotenv.config()

const env = configValidate(process.env)

const config: Config = {
    app: {
        name: env.APP_NAME,
        env: env.APP_ENV,
        port: {
            http: env.APP_PORT_HTTP,
        },
        log: env.APP_LOG,
    },
    db: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        name: env.DB_NAME,
        auth_source: env.DB_AUTH_SOURCE,
    },
    jwt: {
        access_key: env.JWT_ACCESS_SECRET,
        algorithm: env.JWT_ALGORITHM,
    },
    elastic: {
        cloud_id: env.ELASTIC_CLOUD_ID,
        api_key: env.ELASTIC_API_KEY,
    },
    redis: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        ttl: env.REDIS_TTL,
    },
}

export default config
