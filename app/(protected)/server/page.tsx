import { UserInfo } from '@/components/user-info'
import { currentUserwithauth } from '@/lib/Auth'
import React from 'react'

const Server=async()=> {

    const user =await currentUserwithauth()
  return (
    <UserInfo user={user} label=' Server Component'/>
  )
}

export default Server