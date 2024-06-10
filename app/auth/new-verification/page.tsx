import NewVerificationForm from "@/components/auth/new-verification-form"
import { Suspense } from "react"

const NewVerificationPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </div>
  )
}

export default NewVerificationPage
