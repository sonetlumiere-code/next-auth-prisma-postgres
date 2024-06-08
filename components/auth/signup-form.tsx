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
import { signupSchema } from "@/lib/validations/signup-validation"
import { signUp } from "@/actions/signup"
import { Icons } from "../icons"
import GoogleAuth from "./google-auth"
import GithubAuth from "./github-auth"
import FormSuccess from "./form-success"
import FormError from "./form-error"
import { useState } from "react"

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string>("")

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = form

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    setErrorMessage("")
    setSuccessMessage("")

    const res = await signUp(values)

    if (res.success) {
      setSuccessMessage(res.success)
    }

    if (res.error) {
      setErrorMessage(res.error)
    }
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
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
                    <Input
                      placeholder="password"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {errorMessage && <FormError message={errorMessage} />}
          {successMessage && <FormSuccess message={successMessage} />}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Icons.spinner className="w-4 h-4 animate-spin" />
            ) : (
              <>Create account</>
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

export default SignUpForm
