import Link from "next/link"
import SideLink from "./SideLink"

const menus = [
    {
        title: "Dashboard",
        path: "/dashboard"
    },
    {
        title: "User",
        path: "/dashboard/users"
    },
    {
        title: "Archive",
        path: "/dashboard/archives"
    },
    {
        title: "Team",
        path: "/dashboard/team"
    }
]

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-1 px-4 py-8 bg-bgLightSecondary dark:bg-bgDarkSecondary h-screen w-[20%] fixed">
        <Link href="/" className="text-4xl text-gray-100 font-semibold mb-5">Logo</Link>
    {
        menus.map((menu, i) => (
            <SideLink title={menu.title} path={menu.path} key={i} />
        ))
    }
    </div>
  )
}

export default Sidebar
