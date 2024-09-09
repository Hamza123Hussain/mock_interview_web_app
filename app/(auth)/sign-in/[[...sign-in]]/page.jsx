// pages/sign-in.tsx
'use client'
import { SignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const router = useRouter()

  const handleSignInSuccess = () => {
    router.push('/')
  }

  return <SignIn path="/sign-in" afterSignIn={handleSignInSuccess} />
}
