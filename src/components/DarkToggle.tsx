'use client';
import { Theme } from '@/utils/providers/Theme';
import Image from 'next/image'
import { useContext } from 'react';

const DarkToggle = () => {
    const {darkMode, toggle} = useContext(Theme);
    console.log(darkMode, typeof darkMode);
  return (
    <div onClick = {() => toggle()} className="cursor-pointer">
    {
        darkMode ? (
            <Image src="/sun.svg" alt="sun" width={18} height={18} />
        ) : (
            <Image src="/moon.svg" alt="moon" width={15} height={15} />
        )
    }
    </div>
  )
}

export default DarkToggle
