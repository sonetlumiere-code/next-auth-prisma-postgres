"use server"

import { signupSchema } from "@/lib/validations/signup-validation"
import { z } from "zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/db/db"

export const signUp = async (values: z.infer<typeof signupSchema>) => {
  const validatedFields = signupSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields." }
  }

  const { email, password, name } = validatedFields.data

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    return { error: "Email already in use." }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return { success: "User created." }
}
