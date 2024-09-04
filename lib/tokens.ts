import { getVerificationTokenByEmail } from '@/data/verification-token';
import {v4 as uuidv4} from 'uuid'
import prismadb from './db';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';

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