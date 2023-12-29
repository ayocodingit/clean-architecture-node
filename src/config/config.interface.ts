export interface Config {
    app: {
        name: string
        env: string
        port: {
            http: number
        }
        log: string
    }
    db: {
        connection: string
        host: string
        port: number
        username: string
        password: string
        name: string
        auth_source: string
        pool: {
            min: number
            max: number
            acquire: number
            idle: number
        }
        keep_alive: boolean
    }
    jwt: {
        access_key: string
        algorithm: string
    }
    redis: {
        host: string
        port: number
        ttl: number
    }
}
