import config from './config/config'

const database = {
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.connection,
    migrationStorageTableName: 'migrations',
}

export = {
    development: database,
    test: database,
    production: database,
}
