import Link from 'next/link'
import React from 'react'

const HeaderLogo = () => {
  return (
    <div className="py-5 container">
      <Link href="/" className="text-5xl italic">LogoHere</Link>
    </div>
  )
}

export default HeaderLogo
