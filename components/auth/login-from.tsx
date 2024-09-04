
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
import { FormError } from "../from-error"
import { FormSuccess } from "../from-success"
import { login } from "@/action/login"
import { useSearchParams } from "next/navigation"
 
const LoginForm=()=> {
 const searchParams=useSearchParams();
 const urlError=searchParams.get('error')==='OAuthAccountNotLinked'
?"Email already in use with different provider! ":'';
    const [showPassword, setShowPassword] = useState(false); 
    const [error, setError] = useState<string |undefined>('')
    const [success, setSuccess] = useState<string |undefined>('')
    const [isPending,startTransition]=useTransition()
   
   
    const form=useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""

        }
    })

    const onSubmit= (values:z.infer<typeof LoginSchema>)=>{
        setError('')
        setSuccess('')
     startTransition(()=>{
        login(values)
        .then((data)=>{
          
            setError(data?.error);
          
            setSuccess(data?.success);
          
        })
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
                 placeholder="*****" type={showPassword ? 'text' : 'password'} {...field} />
            
          </FormControl>
          <FormMessage />
        
            </FormItem>
                    )}
                    />

                   
                </div>
                
                <FormError message={error || urlError}/>
                <FormSuccess message={success}/>
                <Button 
                disabled={isPending}
                type="submit"
                className="w-full">
                    Login
                </Button>
            </form>

        </Form>
    </CardWrapper>
  )
}

export default LoginForm