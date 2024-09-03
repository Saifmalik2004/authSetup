
"use client"
import * as z from "zod"
import React, { useState } from 'react'
import CardWrapper from './card-wrapper'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from 'lucide-react';
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
 
function LoginForm() {

    const [showPassword, setShowPassword] = useState(false); 
    const [password, setPassword] = useState('');
    const form=useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""

        }
    })

    const onSubmit=(values:z.infer<typeof LoginSchema>)=>{
      console.log(values)
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
                <Input placeholder="john.doe@example.com" type="email" {...field} />
                
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
            placeholder="*****" type={showPassword ? 'text' : 'password'} {...field} />
            
          </FormControl>
          <FormMessage />
        
            </FormItem>
                    )}
                    />

                   
                </div>
                
                <FormError message=""/>
                <FormSuccess message=""/>
                <Button type="submit"
                className="w-full">
                    Login
                </Button>
            </form>

        </Form>
    </CardWrapper>
  )
}

export default LoginForm