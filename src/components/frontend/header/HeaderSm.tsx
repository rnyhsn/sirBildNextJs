import DarkToggle from '@/components/DarkToggle'
import Link from 'next/link'
import React from 'react'

const HeaderSm = () => {
  return (
    <div className="bg-blue-500">
      <div className="container flex items-center justify-between py-2">
        {/* A small site tag/ description */}
        <p> Some description or banner description </p>
        <div className="flex gap-4 items-center">
            <Link href="/dashboard" className="px-3 py-1.5 text-sm bg-red-500 rounded-md">Dashboard</Link>
            <DarkToggle />
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default HeaderSm
