import NavLink from "./NavLink"
import SearchBox from "./SearchBox"

const menus = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Current",
        path: "/current"
    },
    {
       title: "Archives",
       path: "/archive" 
    },
    {
        title: "Editorial Team",
        path: "/editorial-team"
    },
    {
        title: "Review Boad",
        path: "/review-board"
    },
    {
        title: "About",
        path: "/about"
    }
]

const HeaderMenu = () => {
  return (
    <div className="bg-[#2980b9] py-2 text-white">
      <div className="container flex justify-between items-center">
        {/* Menu Section */}
        <div className="flex gap-5 font-semibold text-lg">
        {
            menus.map((menu, i) => (
                <NavLink menu={menu} key={i} />
            ))
        }
        </div>
        {/* Search Box Section */}
        <SearchBox />
      </div>
    </div>
  )
}

export default HeaderMenu
