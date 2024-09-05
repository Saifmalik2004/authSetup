"use server"
import { signIn } from "@/auth"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { getUserByEmail } from "@/data/user"
import prismadb from "@/lib/db"
import {  sendTwoFactorTokenEMail, sendVerificationEmail } from "@/lib/mail"
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"

import * as z from "zod"


export const login= async(values:z.infer< typeof LoginSchema>)=>{
    
    const validatedFields=LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return{ error:"invalid fields"}
    }

     const {email,password,code}= validatedFields.data;

    const existingUser=await getUserByEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error:"Email does not exist!"}
    }
    if(!existingUser.emailVerified){
        
        const verificaionToken=await generateVerificationToken(existingUser.email)
        await sendVerificationEmail(verificaionToken.email,verificaionToken.token)
        
        return { success: " Confirmation Email sent!" } as const;
    }
    if(existingUser.isTwoFactorEnabled && existingUser.email){
        if(code){
           const twoFactorToken=await getTwoFactorTokenByEmail(
            existingUser.email
           );
           if(!twoFactorToken){
            return {error:"Code is Missing!"}
           }
           if(twoFactorToken.token !== code){
            return {error:"Invalid Code!"}
           }

           const hasExpired=new Date(twoFactorToken.expires) < new Date();
    
           if(hasExpired){
            return{error:"Token has expires!"}
            }

            await prismadb.twoFactorToken.delete({
                where:{id:twoFactorToken.id}
            })

            const exiisTingConfirmation =await getTwoFactorConfirmationByUserId(existingUser.id)

            if(exiisTingConfirmation){
              await prismadb.twoFactorConfirmation.delete({
                where:{id:exiisTingConfirmation.id}
              })
            }

            await prismadb.twoFactorConfirmation.create({
                data:{userId:existingUser.id},
            });
            
        }else{
      const twoFactorToken=await generateTwoFactorToken(existingUser.email)
       await sendTwoFactorTokenEMail(
        twoFactorToken.email,
        twoFactorToken.token
       );

       return{twoFactor:true};
        }
    }
     try {
       await signIn('credentials',{
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT
       })
       
      
     } catch (error) {
        if (error instanceof AuthError){
            switch(error.type){
                case'CredentialsSignin':
                 return {error:"Invalid Credentials"}
                default:
                    return {error:"Something went wrong"}
            }
        }

        throw error;
     }
}