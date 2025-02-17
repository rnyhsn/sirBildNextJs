'use client';
import { Theme } from '@/utils/providers/Theme';
import Image from 'next/image'
import { useContext } from 'react';

const DarkToggle = () => {
    const theme = useContext(Theme);
  return (
    <div onClick = {() => theme?.toggle()} className="cursor-pointer">
    {
        theme?.dark ? (
            <Image src="/sun.svg" alt="sun" width={18} height={18} />
        ) : (
            <Image src="/moon.svg" alt="moon" width={15} height={15} />
        )
    }
    </div>
  )
}

export default DarkToggle
