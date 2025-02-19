import Footer from '@/components/frontend/footer/Footer'
import Header from '@/components/frontend/header/Header'
import React, { ReactNode } from 'react'

const FrontendLayout = ({children}: {children: ReactNode}) => {
  return (
    <div>
      <Header />
        <div className="container mt-10">
        {children}
        </div>
      <Footer />
    </div>
  )
}

export default FrontendLayout
