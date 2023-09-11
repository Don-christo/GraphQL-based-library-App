import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const SaltGenerator = async () => {
    return bcrypt.genSalt();
};

export const passwordGenerator = async (lastName:string)=>{
    const mixup = lastName += Math.floor(1000 + Math.random() * 90000)
    return mixup;
}

export const hashPassword = async (password:string, salt:string)=>{
    return await bcrypt.hash(password, salt)
}

export const tokenGenerator = async (_id:string)=>{
    return await jwt.sign({_id}, 'onGod', {expiresIn: '7d'});
} 

export const verifyToken = async (token) =>{
    return await jwt.verify(token, 'onGod')
}