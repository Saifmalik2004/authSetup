import { auth } from "@/auth"

export const currentUserwithauth=async()=>{
    const session=await auth();

    return session?.user;
}


export const currentRolewithauth=async()=>{
    const session=await auth();

    return session?.user?.role;
}