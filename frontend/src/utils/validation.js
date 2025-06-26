// utils/validation.js
import { z } from "zod";




// registration form validation 
export const registerSchema = z.object({
    userName: z
      .string()
      .min(1, { message: "Username is required." })
      .max(50, { message: "Username must be less than 50 characters." }),
  
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Invalid email address." }),
  
    mobile: z
      .string()
      .min(10, { message: "Mobile number must be at least 10 digits." })
      .max(15, { message: "Mobile number must be less than 15 digits." })
      .regex(/^[0-9]+$/, { message: "Mobile must contain only numbers." }),
  
    age: z
      .string()
      .regex(/^\d+$/, { message: "Age must be a number." })
      .refine((val) => parseInt(val) >= 18, {
        message: "You must be at least 18 years old.",
      }),
  
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
  
    role: z
      .string()
      .min(1, { message: "Role is required." })
  });



//   login form validation
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});
