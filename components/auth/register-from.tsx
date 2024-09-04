
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterSchema } from '@/schemas'
import { FormError } from "../from-error"
import { FormSuccess } from "../from-success"
import { register } from "@/action/register"
 
const RegisterForm=()=> {

    const [showPassword, setShowPassword] = useState(false); 
    const [error, setError] = useState<string |undefined>('')
    const [success, setSuccess] = useState<string |undefined>('')
    const [isPending,startTransition]=useTransition()
   
   
    const form=useForm<z.infer<typeof RegisterSchema>>({
        resolver:zodResolver(RegisterSchema),
        defaultValues:{
            email:"",
            password:"",
            name:""

        }
    })

    const onSubmit= (values:z.infer<typeof RegisterSchema>)=>{
        setError('')
        setSuccess('')
     startTransition(()=>{
        register(values)
        .then((data)=>{
         setError(data.error);
         setSuccess(data.success)
         if (data.success) {
          form.reset();  // Reset form values here
      }
         
        })
     })
    }
  return (
    <CardWrapper
    headerLabel='Create an account'
    backButtonHref='/auth/login'
    backButtonLabel="Already have an account?"
    showSocial>
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name='name'
                    render={({field})=>(
                        <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input  disabled={isPending} placeholder="john doe" type="text" {...field} />
                
              </FormControl>
              <FormMessage />
            </FormItem>
                    )}
                    />
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
                
                <FormError message={error}/>
                <FormSuccess message={success}/>
                <Button 
                disabled={isPending}
                type="submit"
                className="w-full">
                    Register
                </Button>
            </form>

        </Form>
    </CardWrapper>
  )
}

export default RegisterForm