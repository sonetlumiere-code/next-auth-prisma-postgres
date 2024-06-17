import { z } from "zod"

export const resetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required.",
  }),
})
