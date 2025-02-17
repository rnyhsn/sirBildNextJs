'use client';
import { register } from '@/utils/actions/user.action';
import { responseCookiesToRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'react-toastify';




const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        let formData = new FormData(e.currentTarget);
      const resp = await register(formData);
      console.log(resp);

      if(resp.success && resp.statusCode === 202) {
        toast.success(resp.message);
        router.push("/login");
      }
      if(!resp.success && resp.statusCode === 409) {
        setError(resp.message);
      }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
  }
  

  return (
    <div className="h-screen w-screen flex items-center justify-center">
        <div className="w-[30%] bg-bgLightSecondary dark:bg-bgDarkSecondary rounded-md py-10 px-8">
           <h1 className="text-4xl font-semibold text-center">Register</h1>
           <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Name</label>
              <input type="text" name="name" required className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">E-mail</label>
              <input type="email" name="email" required className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
              {
                error && <p className="text-red-500" > {error} </p>
              }
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Password</label>
              <input type="password" name="password" required className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
            </div>
            <button disabled={loading}  className={`bg-blue-500 py-2 rounded-sm font-semibold text-lg ${loading && "bg-blue-400 disabled:cursor-not-allowed"}`}>
              {
                loading ? "Loading..." : "Register"
              }
            </button>
           </form>
           <p className="mt-2 text-sm"> Already have an Account? <Link href="/login" className="text-link text-base font-semibold ml-2">Login</Link> </p>
        </div>
    </div>
  )
}

export default RegisterPage
