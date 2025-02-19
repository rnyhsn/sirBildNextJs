import { LuRefreshCw } from "react-icons/lu";


const Loading = () => {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
        <LuRefreshCw className="w-[300px] h-[300px] animate-spin text-gray-500" />
    </div>
  )
}

export default Loading
