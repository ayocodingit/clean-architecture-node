import jwt from 'jsonwebtoken'

class Jwt {
    constructor(private secretOrPublicKey: jwt.Secret) {}

    public Sign(payload: object, options?: jwt.SignOptions) {
        return jwt.sign(payload, this.secretOrPublicKey, options)
    }

    public Verify(token: string) {
        try {
            const decoded = jwt.verify(token, this.secretOrPublicKey)
            return decoded
        } catch (err) {
            return
        }
    }
}

export default Jwt
