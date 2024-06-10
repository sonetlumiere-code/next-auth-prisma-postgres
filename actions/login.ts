"use server"

import { signIn } from "@/lib/auth/auth"
import prisma from "@/lib/db/db"
import { sendVerificacionEmail } from "@/lib/mail/mail"
import { generateVerificationToken } from "@/lib/token/token"
import { loginSchema } from "@/lib/validations/login-validation"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { z } from "zod"

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields." }
  }

  const { email, password } = validatedFields.data

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist." }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )

    await sendVerificacionEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: "Confirmation email sent." }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." }
        default:
          return { error: "Something went wrong." }
      }
    }

    throw error
  }
}
