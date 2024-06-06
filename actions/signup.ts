"use server"

import { signupSchema } from "@/lib/validations/signup-validation"
import { z } from "zod"

export const signUp = (values: z.infer<typeof signupSchema>) => {
  const validatedFields = signupSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  return { success: "Email sent" }
}
