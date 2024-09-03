import prismadb from "@/lib/db"

export const getUserByEmail= async(email:string)=>{
    try {
         const user=await prismadb.user.findUnique({where:{email}})
         return user
    } catch  {
        return null
        
    }
}

export const getUserByID= async(id:string)=>{
    try {
         const user=await prismadb.user.findUnique({where:{id}})
         return user
    } catch  {
        return null
        
    }
}