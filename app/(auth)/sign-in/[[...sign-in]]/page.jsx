// pages/sign-in.tsx

import { SignIn } from '@clerk/nextjs'
import { useRouter } from 'next/router'

export default function SignInPage() {
  const router = useRouter()

  const handleSignInSuccess = () => {
    router.push('/DashBoard')
  }

  return <SignIn path="/sign-in" afterSignIn={handleSignInSuccess} />
}
