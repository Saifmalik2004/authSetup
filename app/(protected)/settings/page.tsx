
import { auth, signOut } from '@/auth'
import React from 'react'


const SettingPage= async()=> {
    const session = await auth();
   


    return (
        <div>
            {JSON.stringify(session)}
            <form action={async () => {
                "use server"
                await signOut();
               
               
               
            }}>
                <button className='bg-black text-white rounded-sm w-full' type='submit'>
                    Sign-out
                </button>
            </form>
        </div>
    )
}

export default SettingPage;
