import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { buttonVariants } from "../ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const ErrorCard = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>Oops! something went wrong!</CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <Link
            href="/auth/login"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full text-center"
            )}
          >
            Log In
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ErrorCard