import prismadb from "@/lib/db"

export const getTwoFactorConfirmationByUserId=async(
    userId:string
)=>{
    try {
        const twoFactorConfirmation =await prismadb.twoFactorConfirmation.findUnique({
            where:{userId}
        })
        return twoFactorConfirmation
    } catch (error) {
        return null
    }
}
