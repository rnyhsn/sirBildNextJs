import EmptyComponent from '@/components/backend/body/EmptyComponent'
import PageTitle from '@/components/PageTitle'
import { deleteMember, getMembers } from '@/utils/actions/member.action'
import { getFile } from '@/utils/cloudinary/config'
import { Trash2, UserPen } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const TeamDashPage = async () => {
  const resp = await getMembers();
  if(resp.success && resp.statusCode === 200 && resp.payload.length === 0) {
    return <EmptyComponent title="Team List is Empty" />
  }
  return (
    <div>
    <PageTitle title="Team Members" link="/dashboard/team/add" />

    <div className="bg-bgLightSecondary dark:bg-bgDarkSecondary px-4 py-4 mt-5 text-left">
      <table className="w-full ">
        <thead>
          <tr>
            <th>s.n</th>
            <th> Name </th>
            <th> E-mail </th>
            <th>Designation</th>
            <th>Academy</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
          resp.success && resp.statusCode === 200 && resp.payload.map(async (member: any, i: number) => {
            let imgUrl = getFile(member?.image);
           
            return <tr key={i} className="even:dark:bg-bgDarkPrimary even:bg-bgLightPrimary">
            <td className="px-2"> {i+1}  </td>
            <td className="flex items-center gap-1">
              <Image src={imgUrl || "/avatar.jpg"} alt="" width={28} height={28} className="rounded-full object-cover w-7 h-7" />
              <span> {member.name} </span>
            </td>
            <td> {member.email} </td>
            <td> {member.designation}  </td>
            <td className="flex flex-col">
              <span>{member.academy}</span>
              <span className="text-xs text-txtLightSecondary dark:text-gray-300"> {member.location} </span>
            </td>
            <td className="text-gray-400"> {member.role} </td>
            
            <td className="flex items-center gap-2 py-1.5">
              <UserPen size={20} color='cyan' />
              <form action={deleteMember} className="cursor-pointer">
                <input type="hidden" name="id" value={member._id.toString()} />
                <button>
                  <Trash2 size={18} color="red" />
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

export default TeamDashPage
