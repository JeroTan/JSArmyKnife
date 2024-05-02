//Required Dependencies: dotenv, jwt, bcrypt
import jwt from "jsonwebtoken";
import 'dotenv/config';
const ExpiresIn = Number(process.env.JWT_EXPIRES);
const Secret = process.env.JWT_SECRET;

export function tokenAuth(id){
    return jwt.sign({id:id}, Secret, { expiresIn: ExpiresIn});
}
export function tokenRead(token, expire=false){
    try{
        return jwt.verify(token, Secret, {ignoreExpiration: expire});
    }catch(e){
        return false;
    }
}
export function tokenHash(data){
    return jwt.sign(data, Secret, { expiresIn: ExpiresIn});
}