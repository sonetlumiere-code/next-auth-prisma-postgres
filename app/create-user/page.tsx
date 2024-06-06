import { createUser } from "@/actions/create-user"

const CreateUserPage = async () => {
  createUser()

  return <div>CreateUserPage</div>
}

export default CreateUserPage
