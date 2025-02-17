import DarkToggle from '@/components/DarkToggle'
import React from 'react'

const Header = () => {
  return (
    <div className="mt-6 flex items-center justify-between pr-5">
      <div className="py-8 px-5 bg-bgLightSecondary dark:bg-bgDarkSecondary rounded-md w-96"></div>
      <DarkToggle />
    </div>
  )
}

export default Header
