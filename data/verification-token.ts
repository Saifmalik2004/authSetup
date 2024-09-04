import prismadb from "@/lib/db"

export const getVerificationTokenByToken=async(
    token:string
)=>{
    try {
        const verificaionToken =await prismadb.verificationToken.findUnique({
            where:{token}
        })
        return verificaionToken
    } catch (error) {
        return null
    }
}

export const getVerificationTokenByEmail=async(
    email:string
)=>{
    try {
        const verificaionToken =await prismadb.verificationToken.findFirst({
            where:{email}
        })
        return verificaionToken
    } catch (error) {
        return null
    }
}