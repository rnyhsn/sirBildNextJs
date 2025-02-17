"use client"
import { login } from '@/utils/actions/user.action'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const resp = await login(formData);
      if(resp.success && resp.statusCode === 200) {
        toast.success(resp.message);
        router.push("/");
      } else if(!resp.success && resp.statusCode === 404) {
        setError(resp.message);
      } else if(!resp.success && resp.statusCode === 401) {
        setError(resp.message);
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center">
        <div className="w-[30%] bg-bgLightSecondary dark:bg-bgDarkSecondary rounded-md py-10 px-8">
           <h1 className="text-4xl font-semibold text-center">Login</h1>
           <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold">E-mail</label>
              <input type="email" name="email" required className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
              {
                error && <p className="text-red-500"> {error} </p>
              }
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Password</label>
              <input type="password" name="password" required className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
            </div>
            <button className="bg-blue-500 py-2 rounded-sm font-semibold text-lg">Register</button>
           </form>
           <p className="mt-2 text-sm"> Don't have an Account? <Link href="/register" className="text-link text-base font-semibold ml-2">Register</Link> </p>
        </div>
    </div>
  )
}

export default LoginPage
