import React, {useState} from 'react'
import Logo from "../../../components/Logo/Logo";
import NavbarList from "./utils/NavbarList";
import clsx from "clsx";

function Header({navMenu}) {
  const [openNav, setOpenNav] = useState(false)

  return (
    <>
      <div className="fixed left-0 top-0 w-full p-3 h-16 border-b z-10 align-middle bg-white">
        <Logo/>
      </div>
      <div
        className={clsx("mt-16 fixed left-0 top-0 h-full z-10 w-0  bg-white " +
          "overflow-hidden transition-all duration-300", openNav ? 'w-64' : 'lg:w-12')}
        onMouseEnter={() => setOpenNav(true)} onMouseLeave={() => setOpenNav(false)}
      >
        <NavbarList navMenu={navMenu} openNav={openNav}/>
      </div>
    </>

  )
}

export default Header