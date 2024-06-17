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
import { resetPasswordSchema } from "@/lib/validations/reset-password"
import { resetPassword } from "@/actions/reset-password"
import Link from "next/link"
import { cn } from "@/lib/utils"

const ResetPasswordForm = () => {
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setError("")
    setSuccess("")

    const res = await resetPassword(values)

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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" disabled={isSubmitting} {...field} />
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
            <>Send reset email</>
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

export default ResetPasswordForm
