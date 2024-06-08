import SignOutButton from "@/components/protected/settings/sign-out-button"
import { auth } from "@/lib/auth/auth"

const SettingsPage = async () => {
  const session = await auth()

  return (
    <div>
      <div>SettingsPage</div>
      <div>{JSON.stringify(session)}</div>
      <SignOutButton />
    </div>
  )
}

export default SettingsPage
