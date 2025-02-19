import Link from 'next/link'


const PostCard = (post: any) => {
    console.log("Single Post")
    console.log(post);
  return (
    <div className="border-l-4 border-gray-400 pl-5">
        <Link href={`/post/${post.slug}`} className="text-lg capitalize text-blue-400 font-semibold hover:text-blue-500"> {post.title} </Link>
        <p className="text-sm text-txtLightSecondary dark:text-txtDarkSecondary">  </p>
    </div>
  )
}

export default PostCard
