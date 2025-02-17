import Link from 'next/link'
import React from 'react'

const EmptyComponent = ({title, link}: {title: string, link?: string}) => {
  return (
    <div className="h-[400px] flex items-center justify-center flex-col">
      <h1 className="text-4xl font-bold tracking-wider text-gray-400"> {title} </h1>
      {
        link &&
        <Link href={link} className="px-8 py-3 font-semibold bg-blue-500 rounded-md mt-3 text-white">Add New</Link>
      }
    </div>
  )
}

export default EmptyComponent
