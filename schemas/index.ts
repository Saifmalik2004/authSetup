import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" }) // Ensures the email field is not empty
    .email({ message: "Invalid email address" }), // Validates the email format
  password: z.string().min(1, { message: "Password is required" }), // Ensures the password field is not empty
});
