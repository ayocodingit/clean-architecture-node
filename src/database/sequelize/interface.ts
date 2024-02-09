import { ModelStatic, Sequelize, Op } from 'sequelize'

export type Model = ModelStatic<any>

export type Schema = {
    post: Model
    // Add other models if needed
    // ...

    // Add other require of the driver database
    connection: Connection
    Op: typeof Op
}

export type Connection = Sequelize
