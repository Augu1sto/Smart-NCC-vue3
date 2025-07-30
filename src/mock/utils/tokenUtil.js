import { SignJWT, jwtVerify, decodeJwt } from 'jose';

const secretKey = new TextEncoder().encode('NOT@#SMARTNCC');
const SUCCESS_CODE = 299; // 验证成功
const EXPIRED_CODE = 700; // token过期
const INVALID_CODE = 701; // token无效

export default {
    generateToken: async function(payload, duration) {
        const expiration = Math.floor(Date.now() / 1000) + duration; // 过期时间
        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime(expiration)
            .sign(secretKey);
        console.log(`TOKEN GENERATED: ${token}`);
        return token;
    },
    validateToken: async function(token) {
        try {
            const { payload } = await jwtVerify(token, secretKey);
            console.log(payload);
            return SUCCESS_CODE;
        } catch (error) {
            if (error.code === 'ERR_JWT_EXPIRED') {
                console.log('TOKEN过期');
                return EXPIRED_CODE;
            }
            console.log('无效TOKEN');
            return INVALID_CODE;
        }
    },
    decodedToken: function(token) {
        return decodeJwt(token);
    }
};