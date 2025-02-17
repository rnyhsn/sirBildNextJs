import { getMembers } from '@/utils/actions/member.action';
import { getFile } from '@/utils/cloudinary/config';
import Image from 'next/image';
import React from 'react'

const ReviewBoardPage = async () => {
  const resp = await getMembers('reviewer');
    return (
      <div className="">
          <div className="container mt-10">
            <div className="flex flex-col gap-3">
            {
              resp.success && resp.statusCode === 200 && resp.payload.map((member: any, i: number) => {
                const imgUrl = getFile( member.image);
                return <div key={i} className="flex gap-4 items-center">
                  <Image src={imgUrl || "/avatar.jpg"} alt="" width={120} height={120} className="rounded-full w-[120px] h-[120px] object-cover" />
                  <div>
                    <h2 className="text-xl font-semibold"> {member.name} </h2>
                    <h2 className="text-cyan-500 font-semibold"> {member.designation} </h2>
                    <h2 className="text-sm text-gray-200"> {member.academy} </h2>
                    <h2 className="text-sm text-gray-300"> {member?.location} </h2>
                    <h2> email: {member.email} </h2>
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
