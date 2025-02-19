"use client";
import RichTextEditor from '@/components/RichTextEditor'
import Image from 'next/image'
import { ChangeEvent, FormEvent, useState } from 'react';
import { MdCloudUpload } from 'react-icons/md'
import { FaTrashCan } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";

import SuperJSON from 'superjson';
import { slugify } from '@/utils/fnc';
import { updatePost } from '@/utils/actions/post.action';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const UpdateArchiveForm = ({data, featuredImg}: {data: any, featuredImg?: string}) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const post: any = SuperJSON.parse(data);
    const [title, setTitle] = useState(post.title);
    const [slug, setSlug] = useState(post.slug);
    const [imgUrl, setImgUrl] = useState(featuredImg);
    console.log("Image url:", imgUrl);
    const handleSlug = () => {
        const slug = slugify(title);
        setSlug(slug);
    }

    const removeImage = () => {
        setImgUrl("");
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            let imgUrl = URL.createObjectURL(e.target.files[0]);
            setImgUrl(imgUrl);
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
          setLoading(true);
          let formData = new FormData(e.currentTarget);
          let resp;
          if(!imgUrl) {
            formData.delete("image");
              resp = await updatePost(formData, true);
          } else {
              resp = await updatePost(formData, false);
          }
          if(resp.success && resp.statusCode === 204) {
            toast.success(resp.message);
            router.push("/dashboard/archives");
          }
          if(!resp.success && resp.statusCode === 401) {
            toast.warning(resp.message);
            setError(resp.message);
          }
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
    }

  return (
    <form className="flex gap-4 mt-5" onSubmit={handleSubmit}>
    <div className="px-6 py-8 rounded-md bg-bgLightSecondary dark:bg-bgDarkSecondary w-[75%]">
        <input type="hidden" value={post._id} name="id" />
        <div className="flex flex-col gap-1 mb-3">
            <label className="text-xl font-semibold">Title</label>
            <textarea name="title" value={title} required onChange={(e)=> setTitle(e.target.value)} className="px-4 py-4 rounded-md text-2xl bg-bgLightPrimary dark:bg-bgDarkPrimary font-semibold outline-none resize-none" />
        </div>
        <div className="flex flex-col gap-1 mb-3">
            <label className="text-xl font-semibold">Slug</label>
            <div className="flex items-center rounded-md bg-bgLightPrimary dark:bg-bgDarkPrimary">
            <input name="slug" value={slug} readOnly className="px-4 py-2 bg-transparent  outline-none flex-1" />
            <div onClick={handleSlug}><IoMdRefresh className="text-2xl mx-2 hover:text-gray-300 cursor-pointer" /></div>
            </div>
            
        </div>
        <div className="flex flex-col gap-1">
            <label className="text-xl font-semibold">Content</label>
            <RichTextEditor content={post.content} />
        </div>
    </div>
    <div className="px-3 py-5 rounded-md bg-bgLightSecondary dark:bg-bgDarkSecondary w-[25%] h-max">
        <div className="h-36 bg-blue-400 rounded-md cursor-pointer relative">
        {
          imgUrl ? (
            <Image src={imgUrl} alt="" fill className="object-cover" />
          ) : (
            <>
            <label htmlFor="image" className="w-full h-full flex items-center justify-center cursor-pointer"> 
              <MdCloudUpload className="text-9xl" />
            </label>
            {
              error && <p className="text-red-500 text-sm font-semibold mt-1.5" > {error} </p>
            }
          </>
          )
        }
        <input type="file" name="image" className="hidden" id="image" accept="image/*" onChange={handleImageChange} />
        <div onClick={removeImage} className={`w-10 h-10 rounded-full bg-red-500 hover:bg-red-400 items-center justify-center absolute -top-2 -right-2 ${imgUrl ? "flex" : "hidden"}`}> <FaTrashCan /></div>
        </div>
        {
          error && <p className="text-red-500 text-sm font-semibold"> {error} </p>
        }
        <button disabled={loading} className={`px-5 py-2 text-white rounded-md font-semibold mt-5 w-full ${loading ? "bg-blue-300 disabled:cursor-not-allowed" : "bg-blue-500 hover:bg-blue-500/90"}`}> {
          loading ? "Wait..." : "Update"
        } </button>
    </div>
  </form>
  )
}

export default UpdateArchiveForm
