'use client';
import { createContext, useState } from "react";

export const Theme = createContext<{darkMode: boolean, toggle: ()=> void}>( {darkMode: true, toggle: ()=> {}} );


export const ThemeProvider = ({children}: {children: React.ReactNode}) => {

    const [darkMode, setDarkMode] = useState(true);

    const toggle = () => {
        setDarkMode(!darkMode);
    }

    return (
        <Theme.Provider  value={{darkMode, toggle}}>
            <html lang="en" className={darkMode ? "dark" : "light"}>
            {children}
            </html>
        </Theme.Provider>
    )
}