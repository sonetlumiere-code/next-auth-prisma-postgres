import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const AuthErrorPage = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Link href="/" className="block">
            <span className="sr-only">Home</span>
            <Image
              src="/img/auth.png"
              alt="Auth logo"
              height={36}
              width={120}
              quality={100}
              className="mx-auto py-4"
            />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Oops! Something went wrong.
          </h1>
          <p className="text-sm text-muted-foreground">
            Authentication failed, try again later.
          </p>
        </div>

        <Link
          href="/auth/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full text-center"
          )}
        >
          Back to Log In
        </Link>

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/auth/signup"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account?{" "}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthErrorPage
