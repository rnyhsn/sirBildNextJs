import EmptyComponent from '@/components/backend/body/EmptyComponent';
import PageTitle from '@/components/PageTitle'
import { getUsers } from '@/utils/actions/user.action'
import {Trash2, UserPen } from 'lucide-react';


const UserDashPage = async () => {
  const resp = await getUsers();

  if(resp.success && resp.payload.length === 0) {
    return (
      <EmptyComponent title="User List is Empty" link="/dashboard/users/add" />
    )
  }

  if(!resp.success && resp.statusCode === 500) {
    return <EmptyComponent title={resp.message} />
  }


  return (
    <div>
      <PageTitle title="Users" />

      <div className="bg-bgLightSecondary dark:bg-bgDarkSecondary px-4 py-4 mt-5 text-left">
        <table className="w-full ">
          <thead>
            <tr>
              <th>s.n</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            resp.success && resp.statusCode === 200 && resp.payload.map((user: any, i: number) => (
              <tr key={i} className="even:dark:bg-bgDarkPrimary even:bg-bgLightPrimary">
                <td className="px-2"> {i+1}  </td>
                <td> {user.name} </td>
                <td> {user.email} </td>
                <td> {user.role} </td>
                <td className="flex items-center gap-2 py-1.5">
                <UserPen size={20} color='cyan' />
                  <Trash2 size={18} color="red" />
                </td>
              </tr>
            ))
          }
          
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserDashPage
