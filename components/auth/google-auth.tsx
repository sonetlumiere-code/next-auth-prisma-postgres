"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { toast } from "../ui/use-toast"
import { Button } from "../ui/button"
import { Icons } from "../icons"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

type GoogleAuthProps = {
  isSubmitting: boolean
}

const GoogleAuth = ({ isSubmitting }: GoogleAuthProps) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)

  const signInWithGoogle = async () => {
    try {
      setIsGoogleLoading(true)
      await signIn("google", {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Google auth failed.",
        description: "Try again later.",
        variant: "destructive",
      })
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isGoogleLoading || isSubmitting}
      onClick={signInWithGoogle}
    >
      {isGoogleLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google />
      )}
      Google
    </Button>
  )
}

export default GoogleAuth
