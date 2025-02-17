import Footer from '@/components/frontend/footer/Footer'
import Header from '@/components/frontend/header/Header'
import React, { ReactNode } from 'react'

const FrontendLayout = ({children}: {children: ReactNode}) => {
  return (
    <div>
      <Header />
        {children}
      <Footer />
    </div>
  )
}

export default FrontendLayout
