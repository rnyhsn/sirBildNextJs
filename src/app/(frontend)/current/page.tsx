import EmptyComponent from '@/components/backend/body/EmptyComponent';
import { getPosts } from '@/utils/actions/post.action';
import Image from 'next/image';
import Link from 'next/link';


const CurrentPage = async () => {
  const resp = await getPosts({limit: 10});
  if(resp.success && resp.payload.length === 0) {
    return <EmptyComponent title="No Post is Added yet" />
  }
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-8 w-[70%]">
      {
        resp.success && resp.payload.map((post: any, i: number) => (
          <div key={i} className="border-l-4 border-gray-400 pl-5">
            <Link href={`/post/${post.slug}`} className="text-lg capitalize text-blue-400 font-semibold hover:text-blue-500"> {post.title} </Link>
            <p className="text-sm text-txtLightSecondary dark:text-txtDarkSecondary"> {post.user.name} </p>
          </div>
        ))
      }
      </div>
      {/* Image Section */}
      <div className="w-[30%] flex justify-end h-max">
        <div className="bg-bgLightSecondary dark:bg-bgDarkSecondary p-8 rounded-md">
          <div className="relative w-[190px] h-[200px]">
            <Image src="/myImg.png" alt='' fill className="object-cover"  />
          </div>
          <div>
            <p className="text-center">
              <code className="font-semibold text-center"> Rony Hossain </code>
            </p>
            <p className="text-center text-gray-700 dark:text-gray-300 text-sm">Student</p>
            <p className="text-center">
              <code className="font-semibold text-center"> University of Rajshahi </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentPage
