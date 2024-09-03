"use client"

import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';
interface BackButtonProps{
label:string;
href:string
}
const BackButton=({
label,
href
}:BackButtonProps)=> {
  return (
   <Button variant='link' size="sm" asChild className='font-normal w-full'>
    <Link href={href}>
    {label}
    </Link>
   </Button>
  )
}

export default BackButton