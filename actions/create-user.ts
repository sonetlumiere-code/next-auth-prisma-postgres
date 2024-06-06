"use server"

import prisma from "@/lib/db/db"

export const createUser = async () => {
  await prisma.user.create({
    data: {
      name: "asd",
    },
  })
}
