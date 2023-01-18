export interface Config {
    app: {
        name: string
        port: {
            http: number
        }
        log: string
    }
    database: {
        host: string
        port: number
        username: string
        password: string
        database: string
    }
    jwt: {
        access_key: string
        algorithm: string
    }
}
