'use server'
import { getPasswordResetTokenByEmail, getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
import prismadb from "@/lib/db"
import { NewPasswordSchema } from "@/schemas"
import * as z from "zod"
import bcrypt from 'bcryptjs';

export const newPassword=async(
    values:z.infer<typeof NewPasswordSchema>,
    token?:string|null
)=>{
   if(!token){
    return {error:"Missing token!"}
   }

   const validatedFields=NewPasswordSchema.safeParse(values);

    if(!validatedFields.success){
        return{ error:"Invalid fields"}
    }

    const {password}=validatedFields.data;
    const existingToken=await getPasswordResetTokenByToken(token)

    if(!existingToken){
        return {error:"Invalid token"}
    }
    const hasExpired=new Date(existingToken.expires) < new Date();
    
    if(hasExpired){
        return{error:"Token has expired!"}
    }

    const existingUser=await getUserByEmail(existingToken.email);

    if(!existingUser){
        return{error:"Email does not exist"}
    }
    const hashedPassword= await bcrypt.hash(password,12);
    
    await prismadb.user.update({
        where:{
            id:existingUser.id
        },
        data:{
              password:hashedPassword,
        }
    })
    await prismadb.passwordResetToken.delete({
        where:{
            id:existingToken.id
        }
    })

    return{success:"Password updated"}
}