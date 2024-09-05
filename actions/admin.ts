'use server'

import { currentRolewithauth } from "@/lib/Auth"
import { UserRole } from "@prisma/client";
import { error } from "console";

export const admin =async()=>{
    const role=await currentRolewithauth();

    if(role === UserRole.ADMIN){
        return{success:"Allowed Server Attion !"}
    }

    return {error:"Forbidden"}
}