import { ModelStatic, Sequelize } from 'sequelize'

export type Model = ModelStatic<any>

export type Schema = {
    post: Model
    // Add other models if needed
}

export type Connection = Sequelize
