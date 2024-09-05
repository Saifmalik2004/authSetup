
'use client'

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";


const SettingPage= ()=> {
    const user = useCurrentUser()
    const onClick=()=>{
        logout()
    }


    return (
        <div className="bg-white p-10 rounded-xl">
            
                <button onClick={onClick} className='bg-black text-white rounded-sm w-full'>
                    Sign-out
                </button>
           
        </div>
    )
}

export default SettingPage;
