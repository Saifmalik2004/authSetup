'use client'
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
import { NewPasswordSchema } from '@/schemas'
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { newPassword } from "@/actions/new-password"
import { useSearchParams } from "next/navigation"

export const NewPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false); 
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()
    

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema), // Corrected to ResetSchema
        defaultValues: {
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            newPassword(values,token)
                .then((data) => {
                    if(data?.error){
              
                        setError(data.error);
                      }
          
                      if(data?.success){
                        
                        setSuccess(data.success);
                        
                      }
                })
                .catch(() => {
                    setError("Something went wrong")
                })
        })
    }

    return (
        <CardWrapper
            headerLabel='Forgot your password'
            backButtonHref='/auth/login'
            backButtonLabel="Back to login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
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
          <FormMessage />
        
            </FormItem>
                    )}
                    />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}


