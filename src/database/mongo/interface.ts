import { Model as model, Connection as connection } from 'mongoose'

export type Model = model<any>

export type Schema = {
    post: Model
    // Add other models if needed
    // ...

    // Add other require of the driver database
    connection: connection
}

export type Connection = connection
