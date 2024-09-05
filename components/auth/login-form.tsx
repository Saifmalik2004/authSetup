
"use client"
import * as z from "zod"
import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from '@/schemas'
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
 
const LoginForm=()=> {
 const searchParams=useSearchParams();
 const urlError=searchParams.get('error')==='OAuthAccountNotLinked'
?"Email already in use with different provider! ":'';

    const [showTwoFactor,setShowTwoFactor]=useState(false)
    const [showPassword, setShowPassword] = useState(false); 
    const [error, setError] = useState<string |undefined>('')
    const [success, setSuccess] = useState<string |undefined>('')
    const [isPending,startTransition]=useTransition()
   
   
    const form=useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:"",
            code:""

        }
    })

    const onSubmit= (values:z.infer<typeof LoginSchema>)=>{
        setError('')
        setSuccess('')
     startTransition(()=>{
        login(values)
        .then((data)=>{
          
            if(data?.error){
              form.reset();
              setError(data.error);
            }

            if(data?.success){
              form.reset();
              setSuccess(data.success);
            }
            if(data?.twoFactor){
              setShowTwoFactor(true)
            }
          
        })
        .catch(()=> setError("Something went wrong"))
     })
    }
  return (
    <CardWrapper
    headerLabel='Welcome back'
    backButtonHref='/auth/register'
    backButtonLabel="Don't have an account?"
    showSocial>
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    {showTwoFactor && (
                       <FormField
                       control={form.control}
                       name='code'
                       render={({field})=>(
                           <FormItem>
                 <FormLabel>Two Factor Code</FormLabel>
                 <FormControl>
                   <Input  disabled={isPending} placeholder="123456"  {...field} />
                   
                 </FormControl>
                 <FormMessage />
               </FormItem>
                       )}
                       />
                    )}
                    {!showTwoFactor &&(
                      <>
                      <FormField
                    control={form.control}
                    name='email'
                    render={({field})=>(
                        <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input  disabled={isPending} placeholder="john.doe@example.com" type="email" {...field} />
                
              </FormControl>
              <FormMessage />
            </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}

                    name='password'
                    render={({field})=>(
                        <FormItem>
              <FormLabel>Password</FormLabel>
              
              
              <FormControl>
                
                <Input 
                 disabled={isPending}
                 placeholder="******" type={showPassword ? 'text' : 'password'} {...field} />
            
          </FormControl>
          <Button size='sm' variant='link' asChild className="px-0 font-normal">
            <Link href='/auth/reset'>
            Forgot password?
            </Link>
          </Button>
          <FormMessage />
        
            </FormItem>
                    )}
                    />
                    </>
                    )
                    }

                   
                </div>
                
                <FormError message={error || urlError}/>
                <FormSuccess message={success}/>
                <Button 
                disabled={isPending}
                type="submit"
                className="w-full">
                  {showTwoFactor?"Confirm":"Login"}
                </Button>
            </form>

        </Form>
    </CardWrapper>
  )
}

export default LoginForm