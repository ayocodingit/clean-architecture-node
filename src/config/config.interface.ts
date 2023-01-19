export interface Config {
    app: {
        name: string
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
        database: string
        auth_source?: string
    }
    jwt: {
        access_key: string
        algorithm: string
    }
}
