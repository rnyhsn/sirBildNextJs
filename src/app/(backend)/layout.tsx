import Header from '@/components/backend/header/Header'
import Sidebar from '@/components/backend/sidebar/Sidebar'
import React, { ReactNode } from 'react'

const BackendLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="flex gap-4">
      <Sidebar />
      <div className="w-full pr-4 flex flex-col gap-5">
        <Header />
        <div className="">
        {children}
        </div>
      </div>
    </div>
  )
}

export default BackendLayout
