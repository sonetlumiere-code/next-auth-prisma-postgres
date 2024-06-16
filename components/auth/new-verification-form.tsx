"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Icons } from "../icons"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import FormError from "./form-error"
import FormSuccess from "./form-success"
import { useRouter } from "next/navigation"

const NewVerificationForm = () => {
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  const router = useRouter()

  const onSubmit = useCallback(async () => {
    if (success || error) {
      return
    }

    if (!token) {
      setError("Missing token")
      return
    }

    const res = await newVerification(token)

    if (res && res.success) {
      setSuccess(res.success)
      setTimeout(() => router.replace("/login"), 1000)
    }

    if (res && res.error) {
      setError("Something went wrong.")
    }
  }, [token, success, error, router])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email verification</CardTitle>
        <CardDescription>Confirming your verification</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        {!success && !error && (
          <Icons.spinner className="w-8 h-8 animate-spin" />
        )}

        {!success && <FormError message={error} />}

        <FormSuccess message={success} />
      </CardContent>
      {/* <CardFooter></CardFooter> */}
    </Card>
  )
}

export default NewVerificationForm
