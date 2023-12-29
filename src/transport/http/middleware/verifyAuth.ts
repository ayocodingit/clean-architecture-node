import { NextFunction, Response } from 'express'
import Error from '../../../pkg/error'
import statusCode from '../../../pkg/statusCode'
import Jwt from '../../../pkg/jwt'

export const VerifyAuth = (jwt: Jwt) => {
    return (req: any, res: Response, next: NextFunction) => {
        const { authorization } = req.headers

        if (!authorization) {
            return next(
                new Error(
                    statusCode.UNAUTHORIZED,
                    statusCode[statusCode.UNAUTHORIZED]
                )
            )
        }

        const [_, token] = authorization.split('Bearer ')

        const decode = jwt.Verify(token)
        if (!decode) {
            return next(
                new Error(
                    statusCode.UNAUTHORIZED,
                    statusCode[statusCode.UNAUTHORIZED]
                )
            )
        }
        req['user'] = decode
        return next()
    }
}
