'use server'

import { getUserByEmail, getUserByID } from '@/data/user';
import { currentUserwithauth } from '@/lib/Auth';
import prismadb from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { SettingsSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs'


export const Settings= async(
    values:z.infer<typeof SettingsSchema>
)=>{
    const user= await currentUserwithauth();
   
    if(!user){
        return{error:"Unauthorized!"}
    }
        const dbUser=await getUserByID(user?.id as string);
    
   

    if(!dbUser){
        return{error:"Unauthorized!"}
    }
    if(user.isOAuth){
        values.email=undefined;
        values.password=undefined;
        values.newPassword=undefined;
        values.isTwoFactorEnabled=undefined
    }

    if(values.email && values.email !== user.email){
        const existingUser =await getUserByEmail(values.email)

        if(existingUser && existingUser.id !== user.id){
            return{error:"Email already in use"}
        }
        const verificaionToken=await generateVerificationToken(values.email)
        await sendVerificationEmail(verificaionToken.email,verificaionToken.token)
        
        return { success: " Verification Email sent!" } as const;


    }

    if(values.password && values.newPassword && dbUser.password){
        const passwordMatch=await bcrypt.compare(
            values.password,
            dbUser.password,
        );

        if(!passwordMatch){
            return{error:"Incorrect password"}
        }

        const hashedPassword=await bcrypt.hash(
            values.newPassword,
            12
        );

        values.password=hashedPassword
        values.newPassword=undefined
    }
    

    const updatedUser =await prismadb.user.update({
        where:{id:dbUser.id},
        data:{
            ...values
        }
    })
    

    return {success:"Settings updated"}
}