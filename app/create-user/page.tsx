import prisma from "@/lib/db/db"

const CreateUserPage = async () => {
  await prisma.user.create({
    data: {
      name: "asd",
    },
  })

  return <div>CreateUserPage</div>
}

export default CreateUserPage
