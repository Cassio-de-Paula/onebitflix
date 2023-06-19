import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../config/enviroment'

const secret = JWT_KEY

export const jwtService = {
    signToken: (payLoad: string | object | Buffer, expiration: string) => {
        return jwt.sign(payLoad, JWT_KEY, {
            expiresIn: expiration
        })
    },

    verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
        jwt.verify(token, secret, callbackfn)
    }
}