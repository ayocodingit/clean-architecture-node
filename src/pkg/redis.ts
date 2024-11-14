import * as redis from 'redis'
import { Config } from '../config/config.interface'
import Logger from './logger'

class Redis {
    public client: redis.RedisClientType
    constructor({ redis }: any, logger: Logger) {
        this.client = redis.createClient({
            url: `redis://${redis.host}:${redis.port}`,
        })
        this.client.connect().then(() => {
            logger.Info('redis connected')
        })
    }

    public async Store(key: string, value: any, ttl: number) {
        return this.client.set(key, value, {
            EX: ttl,
        })
    }

    public async Get(key: string) {
        return this.client.get(key)
    }
}

export default Redis
