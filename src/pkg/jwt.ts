import { Config } from '../config/config.interface'
import jwt from 'jsonwebtoken'
import statusCode from './statusCode'
import error from './error'

class Jwt {
    private secretOrPublicKey: jwt.Secret

    constructor(private config: Config) {
        const { access_key } = this.config.jwt
        this.secretOrPublicKey = access_key
    }

    public Sign(payload: object, expiresIn: string) {
        return jwt.sign(payload, this.secretOrPublicKey, {
            expiresIn,
        })
    }

    public Verify(token: string) {
        try {
            const decoded = jwt.verify(token, this.secretOrPublicKey)
            return decoded
        } catch (err) {
            throw new error(
                statusCode.UNAUTHORIZED,
                statusCode[statusCode.UNAUTHORIZED]
            )
        }
    }
}

export default Jwt
