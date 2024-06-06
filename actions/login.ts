"use server"

import { loginSchema } from "@/lib/validations/login-validation"
import { z } from "zod"

export const login = (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  return { success: "Email sent" }
}
