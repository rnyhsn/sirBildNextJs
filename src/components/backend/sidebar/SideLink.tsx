"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const SideLink = ({title, path}: {title: string, path: string}) => {
    const pathname = usePathname();
  return (
    <Link href={path} className={`text-lg font-semibold py-2 px-4 border hover:border-purple-300 rounded-md transition-all hover:shadow-md hover:text-purple-300 ${pathname === path ? "border-purple-300 shadow-ms text-purple-300" : "border-transparent"}`}>
        {title}
    </Link>
  )
}

export default SideLink
