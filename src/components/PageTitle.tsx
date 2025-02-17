import Link from 'next/link'
import React from 'react'

const PageTitle = ({title, link}: {title: string, link?: string}) => {
  return (
    <div className="py-4 bg-bgLightSecondary dark:bg-bgDarkSecondary px-4 rounded-md flex items-center justify-between">
      <h1 className="text-3xl font-semibold"> {title} </h1>
      {
        link && 
        <Link href={link} className="py-2 px-5 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-500/90"> Add New </Link>
      }
    </div>
  )
}

export default PageTitle
