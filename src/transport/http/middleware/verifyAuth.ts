import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import Error from '../../../pkg/error'
import statusCode from '../../../pkg/statusCode'

export const VerifyAuth = (
    secretOrPublicKey: jwt.Secret,
    options?: jwt.VerifyOptions
) => {
    return (req: any, res: Response, next: NextFunction) => {
        console.log(secretOrPublicKey)

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

        try {
            const decoded = jwt.verify(token, secretOrPublicKey, options)
            req['user'] = decoded
            return next()
        } catch (err) {
            return next(
                new Error(
                    statusCode.UNAUTHORIZED,
                    statusCode[statusCode.UNAUTHORIZED]
                )
            )
        }
    }
}
