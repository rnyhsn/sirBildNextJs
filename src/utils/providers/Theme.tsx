'use client';
import { createContext, useEffect, useState } from "react";

export const Theme = createContext<{darkMode: boolean, toggle: ()=> void}>( {darkMode: true, toggle: ()=> {}} );



export const ThemeProvider = ({children}: {children: React.ReactNode}) => {

    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode') as string) || true);

    const toggle = () => {
        setDarkMode(!darkMode);
    }

    useEffect(()=> {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);
    
    return (
        <Theme.Provider  value={{darkMode, toggle}}>
            <html lang="en" className={darkMode ? "dark" : "light"}>
            {children}
            </html>
        </Theme.Provider>
    )
}