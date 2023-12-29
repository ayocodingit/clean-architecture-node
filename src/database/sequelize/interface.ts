import { ModelStatic, Model as model, Sequelize } from 'sequelize'

export type Model = ModelStatic<model<any, any>>

export type Schema = {
    post: Model
    // Add other models if needed
}

export type Connection = Sequelize
