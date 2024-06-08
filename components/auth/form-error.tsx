import { Icons } from "../icons"

type FormErrorProps = {
  message: string
}

const FormError = ({ message }: FormErrorProps) => {
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-destructive text-sm">
      <Icons.circleAlert className="w-4 h-4" />
      {message}
    </div>
  )
}

export default FormError
