import { currentRolewithauth } from "@/lib/Auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(){
    const role= await currentRolewithauth()
    if(role===UserRole.ADMIN){
        return new NextResponse(null,{status:200})
    }

    return new NextResponse(null,{status:4003})
   
}