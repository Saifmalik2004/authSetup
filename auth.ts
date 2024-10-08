
import NextAuth from "next-auth"
import {PrismaAdapter} from '@auth/prisma-adapter'
import authConfig from'@/auth.config'
import prismadb from "./lib/db";
import { getUserByID } from "./data/user";
import { JWT } from "next-auth/jwt"
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";


  
 
declare module "next-auth/jwt" {
  
  interface JWT {
  
    role?: UserRole
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages:{
    signIn:"/auth/login",
    error:"/auth/login"
  },
  events:{
async linkAccount({user}){
    await prismadb.user.update({
      where:{
        id:user.id
      },
      data:{emailVerified:new Date()}
    })
 }
    },
  
  callbacks:{
        async signIn({user,account}){

          
          // allow Outh without email verification
            if(account?.provider !== 'credentials') return true;
          //prevent signin without email verifiation
            if(user.id){
            const existingUser=await getUserByID(user.id)

            if( !existingUser?.emailVerified) return true

            if(existingUser.isTwoFactorEnabled) {
              const twoFactorConfirmation=await getTwoFactorConfirmationByUserId(existingUser.id)
              if(!twoFactorConfirmation) return false
          
            //Delete Two factor confirmation for next sign in
            await prismadb.twoFactorConfirmation.delete({
              where:{id:twoFactorConfirmation.id}
            });

            }
            }

            
            return true

        },
        async session({session,token}){
           
            if(token.sub && session.user){
                session.user.id= token.sub
            }
            if(token.role && session.user){
                session.user.role=token.role as UserRole
            }
            if( session.user){
              session.user.isTwoFactorEnabled=token.isTwoFactorEnabled as boolean
            }
            if( session.user){
              session.user.name=token.name ;
              session.user.email=token.email as string
              session.user.isOAuth=token.isOAuth as boolean
            }
            return session
        },
         async jwt ({token }) {
            if(!token.sub) return token
            const existingUser =await getUserByID(token.sub);
            if(!existingUser) return token
            
            const existingAccount=await getAccountByUserId(existingUser.id)

            token.isOAuth=!!existingAccount
            token.name=existingUser.name
            token.email=existingUser.email
            token.role=existingUser.role;

            token.isTwoFactorEnabled=existingUser.isTwoFactorEnabled
            return token
         }
    },
    adapter:PrismaAdapter(prismadb),
    session:{strategy:"jwt"},
    ...authConfig
})