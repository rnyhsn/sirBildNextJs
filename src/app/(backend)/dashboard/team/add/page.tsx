'use client';
import PageTitle from '@/components/PageTitle'
import { registerMember } from '@/utils/actions/member.action';
import { CloudUpload, X } from 'lucide-react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'
import { toast } from 'react-toastify';

const TeamAddPage = () => {
    const [error, setError] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleImageChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            let file = e.target.files[0];
            let url = URL.createObjectURL(file);
            setImgUrl(url);
        }
    }

    const removeImage = (e: MouseEvent<HTMLDivElement>) => {
        setImgUrl("");
    }

    const handleMemberSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            let formData = new FormData(e.currentTarget);
            
            let resp = await registerMember(formData);
            if(!resp.success && resp.statusCode === 409) {
                setError(resp.message);
                toast.warning(resp.message);
            } else if(resp.success && resp.statusCode === 202) {
                toast.success(resp.message);
                router.push("/dashboard/team");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
  return (
    <div>
    <PageTitle title="Add Team Member" />
    <form className="flex gap-6 items-center justify-center" onSubmit={handleMemberSubmit}>
        <div className="bg-bgLightSecondary dark:bg-bgDarkSecondary px-10 py-8 mt-5 rounded-md w-[60%]">
        <div className="flex flex-col gap-2">
            <div className="flex gap-5 w-full">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">Name</label>
                    <input type="text" name="name" required className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">E-mail</label>
                    <input type="email" name="email" required className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
                    {
                        error && <p className="text-red-500"> {error} </p>
                    }
                </div>

            </div>
            <div className="flex gap-5 w-full">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">Phone No.</label>
                    <input type="text" name="phone" className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                <label className="font-semibold">Role</label>
                <select name="role" required className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary">
                    <option value="reviewer">Reviewer</option>
                    <option value="editor">Editor</option>
                </select>
                </div>
            </div>
                <div className="flex flex-col gap-1">
                <label className="font-semibold">Designation</label>
                <input type="text" name="designation" required className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
                </div>
                <div className="flex gap-5 w-full">
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="font-semibold">University / Academy</label>
                        <input type="text" name="academy" required className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">Location</label>
                    <input type="text" name="location" required className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
                    </div>
                </div>
                
                <button disabled={loading} className={`py-2 rounded-sm font-semibold text-lg} ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500"} `}>
                {
                    loading ? "Wait..." : "Submit"
                }
                </button>
        </div>
        </div>
                <label htmlFor='file' className="w-[20%] relative px-10 h-[250px] py-20 bg-bgLightSecondary dark:bg-bgDarkSecondary flex justify-center cursor-pointer">
                {
                    imgUrl ? (

                       <Image src={imgUrl} alt="" fill className="object-cover" />
                    ) : (
                        <CloudUpload size={100} />
                    )
                }
                <input type="file" className="hidden" id="file" name="file" accept='image/*' onChange={handleImageChange}  />
                <div onClick={removeImage} className={`w-8 h-8 ${imgUrl ? "flex" : "hidden"} items-center justify-center rounded-full bg-red-500 absolute -top-3 -right-3`}>
                    <X size={20} />
                </div>
                </label>
         
    </form>
   
  </div>
  )
}

export default TeamAddPage
