
import NextAuth from "next-auth";
import {PrismaAdapter} from '@auth/prisma-adapter'
prismadb
import authConfig from'@/auth.config'
import prismadb from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter:PrismaAdapter(prismadb),
    session:{strategy:"jwt"},
    ...authConfig
})