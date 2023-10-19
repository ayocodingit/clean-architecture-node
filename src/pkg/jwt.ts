import jwt from 'jsonwebtoken'
import statusCode from './statusCode'
import error from './error'

class Jwt {
    constructor(private secretOrPublicKey: jwt.Secret) { }

    public Sign(payload: object, options?: jwt.SignOptions) {
        return jwt.sign(payload, this.secretOrPublicKey, options)
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
