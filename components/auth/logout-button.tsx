"use client"

import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";


interface LogoutButtonProps{
    children:React.ReactNode;
}


const LogoutButton:React.FC<LogoutButtonProps>=({
    children

})=> {
   const router=useRouter();
    const onClick=()=>{
     logout()
    }
  return (
   <span onClick={onClick} className='cursor-pointer'>
    {children}
   </span>
  )
}

export default LogoutButton