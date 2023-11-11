import { z } from 'zod';

export const registerFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  // name: z
  //   .string()
  //   .min(2, { message: 'Your name should not be that short! :=_' })
  //   .max(255),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(100),
});
