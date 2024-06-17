"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "../icons"
import FormError from "./form-error"
import { useState } from "react"
import FormSuccess from "./form-success"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { newPasswordSchema } from "@/lib/validations/new-password-validation"
import { useSearchParams } from "next/navigation"
import { newPassword } from "@/actions/new-password"

const NewPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    setError("")
    setSuccess("")

    const res = await newPassword(values, token)

    if (res && res.success) {
      setSuccess(res.success)
    }

    if (res && res.error) {
      setError(res.error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.spinner className="w-4 h-4 animate-spin" />
          ) : (
            <>Reset password</>
          )}
        </Button>

        <Link
          href="/auth/login"
          className={cn(buttonVariants({ variant: "ghost" }), "")}
        >
          Back to Log In
        </Link>
      </form>
    </Form>
  )
}

export default NewPasswordForm
