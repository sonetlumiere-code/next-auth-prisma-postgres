import { z } from "zod"

export const signupSchema = z.object({
  email: z.string().email({
    message: "Email is required.",
  }),
  password: z.string().min(4, { message: "Minimum 4 characters required." }),
  name: z.string().min(1, {
    message: "Name is required.",
  }),
})
