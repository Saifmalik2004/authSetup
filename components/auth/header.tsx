import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

// Ensure the correct usage of `weights` if you need multiple weights
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

interface HearderProps{
    label:string;
}

import React from 'react'

const Header=({label}:HearderProps)=> {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
        <h1 className={cn("text-3xl font-semibold",font.className,)}>
        🔐 Auth

        </h1>
        <p className="text-muted-foreground text-sm">
            {label}
        </p>
    </div>
  )
}

export default Header

