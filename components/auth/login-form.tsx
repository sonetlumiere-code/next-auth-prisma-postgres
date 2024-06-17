"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/lib/validations/login-validation"
import { login } from "@/actions/login"
import { Icons } from "../icons"
import GoogleAuth from "./google-auth"
import GithubAuth from "./github-auth"
import FormError from "./form-error"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import FormSuccess from "./form-success"
import Link from "next/link"

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const searchParams = useSearchParams()
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Another account already exists with the same email address."
      : ""

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError("")
    setSuccess("")

    const res = await login(values)

    if (res && res.success) {
      setSuccess(res.success)
    }

    if (res && res.error) {
      setError(res.error)
    }
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="password"
                        type={showPassword ? "text" : "password"}
                        autoCapitalize="none"
                        autoComplete="on"
                        disabled={isSubmitting}
                        {...field}
                      />
                      <span className="absolute inset-y-0 end-1">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="hover:bg-transparent"
                          disabled={isSubmitting}
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          <span className="sr-only"></span>
                          {showPassword ? (
                            <Icons.eyeOff className="h-5 w-5" />
                          ) : (
                            <Icons.eye className="h-5 w-5" />
                          )}
                        </Button>
                      </span>
                    </div>
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/auth/reset-password">Forgot password?</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error || urlError} />
          <FormSuccess message={success} />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Icons.spinner className="w-4 h-4 animate-spin" />
            ) : (
              <>Log In</>
            )}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <GoogleAuth isSubmitting={isSubmitting} />

      <GithubAuth isSubmitting={isSubmitting} />
    </div>
  )
}

export default LoginForm
