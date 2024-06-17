"use client"

import { Icons } from "../icons"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import FormError from "./form-error"
import FormSuccess from "./form-success"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"

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
      // setTimeout(() => router.replace("/login"), 2000)
    }

    if (res && res.error) {
      setError("Something went wrong.")
    }
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div className="grid gap-3">
      {!success && !error && (
        <div className="flex justify-center items-center">
          <Icons.spinner className="w-8 h-8 animate-spin" />
        </div>
      )}

      {!success && <FormError message={error} />}

      <FormSuccess message={success} />

      {(success || error) && (
        <Link
          href="/auth/login"
          className={cn(buttonVariants({ variant: "ghost" }), "")}
        >
          Back to Log In
        </Link>
      )}
    </div>
  )
}

export default NewVerificationForm
