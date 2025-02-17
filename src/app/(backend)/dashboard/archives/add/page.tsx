'use client';
import PageTitle from "@/components/PageTitle"
import RichTextEditor from "@/components/RichTextEditor"
import { createPost } from "@/utils/actions/post.action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { toast } from "react-toastify";

const AddArchivePage = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const router = useRouter();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
          let url = URL.createObjectURL(e.target.files[0]);
          setImgUrl(url);
        }
    }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          setLoading(true);
          let formData = new FormData(e.currentTarget);
          const resp = await createPost(formData);
          if(resp.success && resp.statusCode === 202) {
            toast.success(resp.message);
            router.push("/dashboard/archives");
          } else if(!resp.success && resp.statusCode === 401) {
            setError(resp.message);
          }
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
        
    }
    
  return (
    <div>
      <PageTitle title="Add Post" />
      <form className="flex gap-4 mt-5" onSubmit={handleFormSubmit}>
        <div className="px-6 py-8 rounded-md bg-bgLightSecondary dark:bg-bgDarkSecondary w-[75%]">
            <div className="flex flex-col gap-1 mb-3">
                <label className="text-xl font-semibold">Title</label>
                <textarea name="title" required className="px-4 py-4 rounded-md text-2xl bg-bgLightPrimary dark:bg-bgDarkPrimary font-semibold outline-none resize-none" />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xl font-semibold">Content</label>
                <RichTextEditor />
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
              </>
              )
            }
            <input type="file" name="image" className="hidden" id="image" accept="image/*" onChange={handleImageChange} />
            </div>
            {
              error && <p className="text-red-500 text-sm font-semibold"> {error} </p>
            }
            <button disabled={loading} className={`px-5 py-2 text-white rounded-md font-semibold mt-5 w-full ${loading ? "bg-blue-300 disabled:cursor-not-allowed" : "bg-blue-500 hover:bg-blue-500/90"}`}> {
              loading ? "Wait..." : "Create"
            } </button>
        </div>
      </form>
    </div>
  )
}

export default AddArchivePage
