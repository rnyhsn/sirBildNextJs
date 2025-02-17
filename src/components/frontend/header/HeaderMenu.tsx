import NavLink from "./NavLink"

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
        <div>
            <input type="text" className="py-1.5 rounded-md text-black mr-2 px-3 outline-none" placeholder="Search Here..." />
            <button className="px-3 py-1.5 bg-white text-black rounded-md font-semibold">Search</button>
        </div>
      </div>
    </div>
  )
}

export default HeaderMenu
