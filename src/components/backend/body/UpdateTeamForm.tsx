'use client';

import { updateMember } from "@/utils/actions/member.action";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";

import { toast } from "react-toastify";
import SuperJSON from "superjson";

const role = [
    'reviewer',
    'editor'
]

const UpdateTeamForm = ({data, image}: {data: string, image: string}) => {

       const [error, setError] = useState("");
        const [imgUrl, setImgUrl] = useState(image);
        const [loading, setLoading] = useState(false);
        const router = useRouter(); 

        const member: any = SuperJSON.parse(data);
    
        const handleImageChange = (e:ChangeEvent<HTMLInputElement>) => {
            if(e.target.files) {
                let file = e.target.files[0];
                let url = URL.createObjectURL(file);
                setImgUrl(url);
            }
        }

        // const removeImage = () => {

        // }

        const handleMemberSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                setLoading(true);
                const formData = new FormData(e.currentTarget);
                const resp = await updateMember(formData);

                if(!resp.success && resp.statusCode === 404) {
                    return notFound();
                } else if(!resp.success && resp.statusCode === 409) {
                    setError(resp.message);
                } else if(resp.success && resp.statusCode === 202) {
                    toast.success(resp.message);
                    router.push("/dashboard/team");
                }

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

  return (
    <form className="flex gap-6 items-center justify-center" onSubmit={handleMemberSubmit}>
            <div className="bg-bgLightSecondary dark:bg-bgDarkSecondary px-10 py-8 mt-5 rounded-md w-[60%]">
            <div className="flex flex-col gap-2">
                <div className="flex gap-5 w-full">
                    <input type="hidden" name="id" value={member._id} />
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="font-semibold">Name</label>
                        <input type="text" name="name" placeholder={member.name} className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="font-semibold">E-mail</label>
                        <input type="email" name="email" placeholder={member.email}  className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
                        {
                            error && <p className="text-red-500"> {error} </p>
                        }
                    </div>

                </div>
                <div className="flex gap-5 w-full">
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="font-semibold">Phone No.</label>
                        <input type="text" name="phone" placeholder={member?.phone} className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">Role</label>
                    <select name="role" defaultValue={member.role} className="py-2 px-3 capitalize outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary">
                    {
                        role.map((r) => (
                            <option key={r} value={r} className="" > {r} </option>
                        ))
                    }
                    </select>
                    </div>
                </div>
                    <div className="flex flex-col gap-1">
                    <label className="font-semibold">Designation</label>
                    <input type="text" name="designation" placeholder={member.designation} className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
                    </div>
                    <div className="flex gap-5 w-full">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="font-semibold">University / Academy</label>
                            <input type="text" name="academy" placeholder={member.academy} className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                        <label className="font-semibold">Location</label>
                        <input type="text" name="location" placeholder={member.location} className="py-2 px-3 outline-none rounded-sm bg-bgLightPrimary dark:bg-bgDarkPrimary" />
                        </div>
                    </div>
                    
                    <button disabled={loading} className={`py-2 rounded-sm font-semibold text-lg} ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500"} `}>
                    {
                        loading ? "Wait..." : "Submit"
                    }
                    </button>
            </div>
            </div>
            <label htmlFor='file' className="w-[20%] relative px-10 h-[250px] py-20 bg-bgLightSecondary dark:bg-bgDarkSecondary flex justify-center cursor-pointer group">
            {
                imgUrl ? (

                   <Image src={imgUrl} alt="" fill className="object-cover" />
                ) : (
                    <FaCloudUploadAlt size={100} />
                )
            }
            <input type="file" className="hidden" id="file" name="file" accept='image/*' onChange={handleImageChange}  />
            <div  className="w-full h-full bg-black opacity-50 absolute z-10 top-0 left-0 hidden group-hover:flex items-center justify-center">
                <MdCloudUpload className="text-9xl" />
            </div>
            {
                error && <p className="text-red-500"> {error} </p>
            }
            </label>
    </form>
  )
}

export default UpdateTeamForm
