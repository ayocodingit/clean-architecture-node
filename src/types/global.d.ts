import { Request, File } from 'express'

declare global {
    namespace Express {
        interface User {
            id: string
        }

        interface Request {
            user?: User
        }
    }
}

export interface AuthenticatedRequest extends Request {
    user: Express.User
    query: any
    body: any
    params: any
    file: File
    files: File[]
    headers: any
}
