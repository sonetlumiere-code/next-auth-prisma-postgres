"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signupSchema } from "@/lib/validations/signup-validation"
import { signUp } from "@/actions/signup"
import { Loader2 } from "lucide-react"
import { toast } from "../ui/use-toast"

const SignUpForm = () => {
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
    const res = await signUp(values)
    if (res.success) {
      toast({
        title: "User created.",
        description: res.success,
      })
    }

    if (res.error) {
      toast({
        variant: "destructive",
        title: "Error creating user.",
        description: res.error,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="email" disabled={isSubmitting} {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
                <Input placeholder="email" disabled={isSubmitting} {...field} />
              </FormControl>
              <FormDescription>Email.</FormDescription>
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
              <FormDescription>Password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-36">
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>Create account</>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm
