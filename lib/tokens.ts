import { getVerificationTokenByEmail } from '@/data/verification-token';
import {v4 as uuidv4} from 'uuid'
import prismadb from './db';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import crypto from 'crypto'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';


export const generateTwoFactorToken=async(email:string)=>{
    const token =crypto.randomInt(100_000,1_000_000).toString();
    const expires=new Date(new Date().getTime()+ 5 *60 *1000)
   
    const existingToken =await getTwoFactorTokenByEmail(email)
    if(existingToken){
       await prismadb.twoFactorToken.delete({
           where:{
               id:existingToken.id,
           }
       })
    }
    const twoFactorToken=await prismadb.twoFactorToken.create({
       data:{
           email,
           token,
           expires,
       }
    });
   
   return twoFactorToken
   }
export const generateVerificationToken=async(email:string)=>{
 const token =uuidv4();
 const expires=new Date(new Date().getTime()+3600 *1000)

 const existingToken =await getVerificationTokenByEmail(email)
 if(existingToken){
    await prismadb.verificationToken.delete({
        where:{
            id:existingToken.id,
        }
    })
 }
 const verificaionToken=await prismadb.verificationToken.create({
    data:{
        email,
        token,
        expires,
    }
 });

return verificaionToken
}

export const generatePasswordResetToken=async(email:string)=>{
    const token =uuidv4();
    const expires=new Date(new Date().getTime()+3600 *1000)
   
    const existingToken =await getPasswordResetTokenByEmail(email)
    if(existingToken){
       await prismadb.passwordResetToken.delete({
           where:{
               id:existingToken.id,
           }
       })
    }
    const passwordResetToken=await prismadb.passwordResetToken.create({
       data:{
           email,
           token,
           expires,
       }
    });
   
   return passwordResetToken
   }