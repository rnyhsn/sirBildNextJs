import EmptyComponent from '@/components/backend/body/EmptyComponent';
import UpdateArchiveForm from '@/components/backend/body/UpdateArchiveForm'
import PageTitle from '@/components/PageTitle'
import { getPost } from '@/utils/actions/post.action';
import { getFile } from '@/utils/cloudinary/config';
import SuperJSON from 'superjson';



const UpadateArchivePage = async ({params}: {params: Promise<any>}) => {
    // console.log(params);
    const id = (await params).id;
    console.log(id);
    const resp = await getPost(id);
    if(!resp.success && resp.statusCode === 404) {
        return <EmptyComponent title="404-Post Not Found" />
    }
    const image = getFile(resp.payload?.featuredImg);
    let post = SuperJSON.stringify(resp.payload);

  return (
    <div>
      <PageTitle title="Upade Posts" />
      {
        resp.success && resp.statusCode === 200 && 
      <UpdateArchiveForm data={post} featuredImg={image} />
      }
    </div>
  )
}

export default UpadateArchivePage
