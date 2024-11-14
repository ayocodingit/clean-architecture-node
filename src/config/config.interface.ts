export type Config = {
    app: {
        name: string
        env: string
        port: {
            http: number
        }
        log: string
        prefix: string
    }
    file: {
        max: number
        uri: string
    }
    db: {
        connection: string
        uri: string
        host: string
        port: number
        username: string
        password: string
        name: string
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
}
