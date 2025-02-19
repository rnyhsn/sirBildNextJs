'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const NavLink = ({menu}: {menu: {title: string, path: string}}) => {
    const pathname = usePathname();
  return (
    <Link href={menu.path} className={menu.path === pathname ? "text-yellow-500" : ""}>
      {menu.title}
    </Link>
  )
}

export default NavLink
