"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from 'use-debounce';
const SearchBox = () => {
   const searchParams = useSearchParams();
   const pathname = usePathname();
    const router = useRouter();
   console.log(searchParams);
   console.log(pathname);


   const handleSearchChange = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams);
        // console.log(params.get('q'));
        
        if(e.target.value) {
            e.target.value.length > 2 &&
            params.set('q', e.target.value);
        } else {
            params.delete('q');
        }
        // The one for all page/route searching purpose
        // router.replace(`${pathname}?${params}`);
        router.replace(`/search?${params}`);
    }, 400)

   // replace the path 
//    router.replace(`${pathname}?${params}`);

  return (
    <div>
        <input type="text" onChange={handleSearchChange}  className="py-1.5 rounded-md text-black mr-2 px-3 outline-none" placeholder="Search Here..." />
        <button className="px-3 py-1.5 bg-white text-black rounded-md font-semibold">Search</button>
    </div>
  )
}

export default SearchBox
