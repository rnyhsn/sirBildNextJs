import EmptyComponent from '@/components/backend/body/EmptyComponent';
import UpdateTeamForm from '@/components/backend/body/UpdateTeamForm';
import PageTitle from '@/components/PageTitle'
import { getMember } from '@/utils/actions/member.action';
import { getFile } from '@/utils/cloudinary/config';
import React from 'react'
import SuperJSON from 'superjson';

const TeamUpdatePage = async ({params}: {params: Promise<any>}) => {
    const id = (await params).id;
    console.log(id);
    const resp = await getMember(id);
    if(!resp.success && resp.statusCode === 404) {
        return <EmptyComponent title="404 - Member not found" />
    }

    const data = SuperJSON.stringify(resp.payload);
    const image = await getFile(resp.payload?.image);
  return (
    <div>
      <PageTitle title="Update Team Member" />
      <UpdateTeamForm data={data} image={image} />
    </div>
  )
}

export default TeamUpdatePage
