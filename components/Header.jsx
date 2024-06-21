'use client'
import Image from 'next/image'
import React from 'react'

import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
const Header = () => {
  const { isSignedIn, user } = useUser()
  return (
    <div className=" px-3 py-4 shadow-md items-center flex justify-between">
      <div className=" flex gap-2 items-center">
        <div className=" sm:hidden">
          <Sheet>
            <SheetTrigger>burger Icon</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  {' '}
                  <Image
                    src={'./WebsiteLogo.svg'}
                    width={100}
                    height={100}
                    alt="Logo"
                  />{' '}
                </SheetTitle>
                <SheetDescription>
                  <ul className=" list-none flex-col  flex   gap-4 font-bold">
                    <li>DashBoard</li>
                    <li>Questions</li>
                    <li>How It Works?</li>
                  </ul>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <Image src={'./WebsiteLogo.svg'} width={100} height={100} alt="Logo" />
      </div>
      <div className=" hidden sm:inline">
        <ul className=" list-none flex-col sm:flex-row flex justify-center items-center gap-4 font-bold">
          <li>DashBoard</li>
          <li>Questions</li>
          <li>How It Works?</li>
        </ul>
      </div>

      {isSignedIn ? (
        <div className=" flex  gap-4 items-center">
          <p className=" hidden sm:inline">{user.fullName}</p>
          <UserButton />
        </div>
      ) : (
        <Link href={'./sign-in'}> Lets Get Started</Link>
      )}
    </div>
  )
}

export default Header
