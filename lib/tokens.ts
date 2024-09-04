import { getVerificationTokenByEmail } from '@/data/verification-token';
import {v4 as uuidv4} from 'uuid'
import prismadb from './db';

export const generateVerificationtoken=async(email:string)=>{
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