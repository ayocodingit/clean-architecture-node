import { Model as model, Connection as connection } from 'mongoose'

export type Model = Document

export type Schema = {
    post: model<Document>
    // Add other models if needed
}

export type Connection = connection
