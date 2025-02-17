import EmptyComponent from '@/components/backend/body/EmptyComponent';
import PageTitle from '@/components/PageTitle';
import { deletePost, getPosts } from '@/utils/actions/post.action';
import { getFile } from '@/utils/cloudinary/config';
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import Image from 'next/image';
import React from 'react'

const ArchieveDashPage = async () => {
  const resp = await getPosts();

  if(resp.success && resp.statusCode === 200 && resp.payload.length === 0) {
    return <EmptyComponent title="Post List is Empty" />
  }

  return (
    <div>
    <PageTitle title="Posts" link="/dashboard/archives/add" />

    <div className="bg-bgLightSecondary dark:bg-bgDarkSecondary px-4 py-4 mt-5 text-left">
      <table className="w-full ">
        <thead>
          <tr>
            <th>s.n</th>
            <th> Title </th>
            <th> Content </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
          resp.success && resp.statusCode === 200 && resp.payload.map(async (post: any, i: number) => {
            let imgUrl = getFile(post?.featuredImg);
           
            return <tr key={i} className="even:dark:bg-bgDarkPrimary even:bg-bgLightPrimary">
            <td className="px-2"> {i+1}  </td>
            <td className="flex items-center gap-1">
              <Image src={imgUrl || "/avatar.jpg"} alt="" width={28} height={28} className="rounded-full object-cover w-7 h-7" />
              <span> {post.title} </span>
            </td>
            <td> {post.content.slice(0, 35)}... </td>
            <td className="flex items-center gap-2 py-1.5">
              <FaEdit className="text-green-500" />
              <form action={deletePost} className="cursor-pointer">
                <input type="hidden" name="id" value={post._id.toString()} />
                <button>
                  <FaRegTrashAlt className="text-red-500" />
                </button>
              </form>
            </td>
          </tr>
          })
        }
          
     
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default ArchieveDashPage
