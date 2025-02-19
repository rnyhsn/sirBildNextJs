import EmptyComponent from '@/components/backend/body/EmptyComponent';
import PageTitle from '@/components/PageTitle';
import { deletePost, getPosts } from '@/utils/actions/post.action';
import { getFile } from '@/utils/cloudinary/config';
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";

import Image from 'next/image';
import React from 'react'
import Link from 'next/link';

const ArchieveDashPage = async () => {
  const resp = await getPosts({});

  if(resp.success && resp.statusCode === 200 && resp.payload.length === 0) {
    return <EmptyComponent title="Post List is Empty" link='/dashboard/archives/add' />
  }

  return (
    <div>
    <PageTitle title="Posts" link="/dashboard/archives/add" />

    <div className="bg-bgLightSecondary dark:bg-bgDarkSecondary p-8 mt-5 text-left">
        <table className="w-full">
          <thead>
              <tr>
                <th>s.n.</th>
                <th className="text-center py-1.5">Title</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
          </thead>
          <tbody>
          {
            resp.success && resp.statusCode === 200 && resp.payload.map(async(post: any, i: number) => {
              let imgUrl = "";
              if(post.featuredImg) {
                imgUrl = await getFile(post.featuredImg);
              }
              return (
                <tr className="odd:dark:bg-bgDarkPrimary odd:bg-bgLightPrimary">
                <td className="pl-2"> {i+1} </td>
                <td className="text-sm px-2 flex items-center gap-1.5 py-1.5">
                  <Image src={imgUrl || "/avatar.jpg"} alt="" width={28} height={28} className="w-7 h-7 rounded-full object-cover" />
                  <span>{post.title.slice(0, 100)}</span>
                </td>
                <td className="w-40 text-purple-600"> {post.user.name} </td>
                <td className="flex items-center gap-1.5 justify-end pr-2">
                  <Link href={`/post/${post.slug}`}>
                    <IoMdEye className="text-purple-400" />
                  </Link>
                  <Link href={`/dashboard/archives/${post._id}`}>
                    <FaEdit className="text-green-500" />
                  </Link>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post._id.toString()} />
                    <button><FaRegTrashAlt className="text-red-500" /></button>
                  </form>
                </td>
              </tr>
              )
            })
          }
            
          </tbody>
        </table>
    </div>
  </div>
  )
}

export default ArchieveDashPage
