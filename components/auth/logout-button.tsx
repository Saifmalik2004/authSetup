"use client"

import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


interface LogoutButtonProps{
    children:React.ReactNode;
}


const LogoutButton:React.FC<LogoutButtonProps>=({
    children

})=> {
   const router=useRouter();
    const onClick=()=>{
     signOut()
    }
  return (
   <span onClick={onClick} className='cursor-pointer'>
    {children}
   </span>
  )
}

export default LogoutButton