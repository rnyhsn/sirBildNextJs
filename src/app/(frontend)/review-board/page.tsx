import { getMembers } from '@/utils/actions/member.action';
import { getFile } from '@/utils/cloudinary/config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const ReviewBoardPage = async () => {
  const resp = await getMembers('reviewer');
    return (
      <div className="">
          <div className="container">
            <div className="flex flex-col gap-3">
            {
              resp.success && resp.statusCode === 200 && resp.payload.map((member: any, i: number) => {
                const imgUrl = getFile( member.image);
                return <div key={i} className="flex gap-4 items-center">
                  <Image src={imgUrl || "/avatar.jpg"} alt="" width={120} height={120} className="rounded-full w-[120px] h-[120px] object-cover" />
                  <div>
                    <h2 className="text-xl font-semibold"> {member.name} </h2>
                    <p className="dark:text-gray-300 text-gray-700 font-semibold"> <code>{member.designation}</code> </p>
                    <h2 className="text-sm dark:text-gray-400 text-gray-700"> {member.academy} </h2>
                    <h2 className="text-sm text-gray-300"> <code>{member?.location}</code> </h2>
                    <Link href={`mailto:${member.email}`} className="text-blue-500"> email: {member.email} </Link>
                  </div>
                </div>
              })
            }
            </div>
          </div>
      </div>
    )
}

export default ReviewBoardPage
