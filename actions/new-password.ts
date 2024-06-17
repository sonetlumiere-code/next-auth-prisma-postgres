"use server"

import { getPasswordResetToken } from "@/data/password-reset-token"
import { getUser } from "@/data/user"
import { newPasswordSchema } from "@/lib/validations/new-password-validation"
import { z } from "zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/db/db"

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token." }
  }

  const validatedFields = newPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields." }
  }

  const { password } = validatedFields.data

  const existingToken = await getPasswordResetToken({ where: { token } })

  if (!existingToken) {
    return { error: "Invalid token." }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: "Token has expired." }
  }

  const existingUser = await getUser({ where: { email: existingToken.email } })

  if (!existingUser) {
    return { error: "Email does not exists." }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  })

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  })

  return { success: "Password updated" }
}
