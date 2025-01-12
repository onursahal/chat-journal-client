import { z } from 'zod'

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name cannot be empty' }),
    lastName: z.string().min(1, { message: 'Last name cannot be empty' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),

    // add agreements when its nessesary
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const signInSchema = z.object({
  email: z.string().email({ message: 'Email is not valid' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})
