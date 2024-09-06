import { UserRole } from '@prisma/client';
import * as z from 'zod';


export const SettingsSchema=z.object({
  name:z.optional(z.string()),
  isTwoFactorEnabled:z.optional(z.boolean()),
  role:z.enum([UserRole.ADMIN,UserRole.USER]),
  email:z.optional(z.string().email()),
  password:z.optional(z.string().min(6)),
  newPassword:z.optional(
    z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password can't be longer than 100 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    })
    
  )
  



})
.refine((data)=>{
  if(data.password && !data.newPassword){
    return false
    
  }
  return true
},{
  message:"New Password is required!",
  path:['newPassword']
})
.refine((data)=>{
  if(data.newPassword && !data.password){
    return false
    
  }
  return true
},{
  message:"Old Password is required!",
  path:['oldPassword']
})




export const LoginSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" }) // Ensures the email field is not empty
    .email({ message: "Invalid email address" }), // Validates the email format
  password: z.string().min(1, { message: "Password is required" }), // Ensures the password field is not empty
  code:z.optional(z.string())
});

export const ResetSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" }) // Ensures the email field is not empty
    .email({ message: "Invalid email address" }), // Validates the email format
  
});

export const NewPasswordSchema = z.object({
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password can't be longer than 100 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    }),
});



export const RegisterSchema = z.object({
  name: z.string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name can't be longer than 50 characters" }),
    

  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password can't be longer than 100 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    }),

  
})

