"use server"

import { getUser } from "@/data/user"
import { resetPasswordSchema } from "@/lib/validations/reset-password"
import { z } from "zod"

export const resetPassword = async (
  values: z.infer<typeof resetPasswordSchema>
) => {
  try {
    const validatedFields = resetPasswordSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "Invalid email." }
    }

    const { email } = validatedFields.data

    const existingUser = await getUser({ where: { email } })

    if (!existingUser) {
      return { error: "Email not found." }
    }

    return { success: "Reset email sent." }
  } catch (error) {
    console.error(error)
    return { error: "Something went wrong." }
  }
}
