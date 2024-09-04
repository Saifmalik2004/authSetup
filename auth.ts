
import NextAuth, { type DefaultSession } from "next-auth"
import {PrismaAdapter} from '@auth/prisma-adapter'
import authConfig from'@/auth.config'
import prismadb from "./lib/db";
import { getUserByID } from "./data/user";
import { JWT } from "next-auth/jwt"
import { UserRole } from "@prisma/client";

declare module "next-auth" {
    interface Session {
      user: {
       
        role: UserRole
       
      } & DefaultSession["user"]
    }
  }
  
 
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

          console.log(user,account)
          // allow Outh without email verification
            if(account?.provider !== 'credentials') return true;
          //prevent signin without email verifiation
            if(user.id){
            const existingUser=await getUserByID(user.id)
            if( !existingUser?.emailVerified) return true
            }

            //2fa
            return true

        },
        async session({session,token}){
            console.log({sessionTOken:token})
            if(token.sub && session.user){
                session.user.id= token.sub
            }
            if(token.role && session.user){
                session.user.role=token.role
            }
            return session
        },
         async jwt ({token }) {
            if(!token.sub) return token
            const existingUser =await getUserByID(token.sub);
            if(!existingUser) return token
            token.role=existingUser.role

            return token
         }
    },
    adapter:PrismaAdapter(prismadb),
    session:{strategy:"jwt"},
    ...authConfig
})