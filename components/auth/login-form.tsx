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
import { toast } from "../ui/use-toast"
import { Icons } from "../icons"
import GoogleAuth from "./google-auth"
import GithubAuth from "./github-auth"

const LoginForm = () => {
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
    const res = await login(values)

    if (res && res.error) {
      toast({
        variant: "destructive",
        title: "Error.",
        description: res.error,
      })
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
