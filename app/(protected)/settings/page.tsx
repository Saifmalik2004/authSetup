import { auth, signOut } from '@/auth'
import React from 'react'
import { redirect } from 'next/navigation'; // Import the redirect helper from Next.js

const SettingPage= async()=> {
    const session = await auth();

    return (
        <div>
            {JSON.stringify(session)}
            <form action={async () => {
                "use server"
                await signOut();

                // Redirect to the login page after sign-out
                redirect('/auth/login');
            }}>
                <button className='bg-black text-white rounded-sm w-full' type='submit'>
                    Sign-out
                </button>
            </form>
        </div>
    )
}

export default SettingPage;
