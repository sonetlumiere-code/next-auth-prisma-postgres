"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { toast } from "../ui/use-toast"
import { Button } from "../ui/button"
import { Icons } from "../icons"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

type GithubAuthProps = {
  isSubmitting: boolean
}

const GithubAuth = ({ isSubmitting }: GithubAuthProps) => {
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false)

  const signInWithGithub = async () => {
    try {
      setIsGithubLoading(true)
      await signIn("github", {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Github auth failed.",
        description: "Try again later.",
        variant: "destructive",
      })
    } finally {
      setIsGithubLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isGithubLoading || isSubmitting}
      onClick={signInWithGithub}
    >
      {isGithubLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.github className="w-4 h-4 mr-2" />
      )}
      Github
    </Button>
  )
}

export default GithubAuth
