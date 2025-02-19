import { getPostBySlug } from "@/utils/actions/post.action";
import { getFile } from "@/utils/cloudinary/config";
import Image from "next/image";
import { notFound } from "next/navigation";
import parse from 'html-react-parser';

const SinglePostPage = async ({params}: {params: Promise<any>}) => {
    let slug = (await params).slug;
    const resp = await getPostBySlug(slug);
    if(!resp.success && resp.statusCode === 404) {
        return notFound();
    }
    let post = resp.payload;
    let img = "";
    if(post.featuredImg) {
        img = getFile(post.featuredImg);
    }
    
  return (
    <div>
      <div className="flex gap-8">
      <div className="flex flex-col gap-4 w-[80%] py-10 px-12 bg-bgLightSecondary dark:bg-bgDarkSecondary rounded-md">
        <h2> {post.title} </h2>
        {
            img && (
                <div className="h-[200px] w-[70%] mx-auto relative">
                    <Image src={img} alt="" fill  />
                </div>
            )
        }
        <div className="leading-8">
            {parse(post.content)}
        </div>
      </div>
      <div className="w-[30%] flex justify-end h-max">
        <div className="bg-bgLightSecondary dark:bg-bgDarkSecondary p-8 rounded-md">
          <div className="relative w-[190px] h-[200px]">
            <Image src="/myImg.png" alt='' fill className="object-cover"  />
          </div>
          <div>
            <p className="text-center">
              <code className="font-semibold text-center"> {post.user.name} </code>
            </p>
            <p className="text-center text-gray-700 dark:text-gray-300 text-sm"> {post.user.email} </p>
            <p className="text-center text-gray-700 dark:text-gray-300 text-sm"> Student </p>
            <p className="text-center">
              <code className="font-semibold text-center"> University of Rajshahi </code>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SinglePostPage
