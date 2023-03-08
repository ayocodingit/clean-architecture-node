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
        host: string
        port: number
        username: string
        password: string
        name: string
        auth_source: string
    }
    jwt: {
        access_key: string
        algorithm: string
    }
    elastic: {
        cloud_id: string
        api_key: string
    }
    redis: {
        host: string
        port: number
        ttl: number
    }
}
