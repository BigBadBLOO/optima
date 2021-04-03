//core
import React, {useState} from 'react'
import clsx from "clsx";

//components
import Logo from "@components/Base/Logo/Logo";
import {ElementNavbar, ListElement} from "@pages/UserAuth/platform/typePlatform/AgencyLidgen/components/ElementNavbar";

type HeaderType = {
  navList: {
    path?: string,
    name: string,
    active?: boolean,
    icon: string,
    child?: {
      path: string,
      name: string,
      active: boolean,
    }[]
  }[]
}
const Header: React.FC<HeaderType> = ({navList}) => {
  const [openNav, setOpenNav] = useState(false)

  return (
    <>
      <div className="fixed left-0 top-0 w-full p-3 h-12 border-b z-10 align-middle bg-white">
        <div className="flex">
          <span className="material-icons md:hidden mx-2" onClick={() => setOpenNav(prev => !prev)}>
            {openNav ? "close" : "menu" }
          </span>
          <Logo/>
        </div>

      </div>
      <div
        className={clsx("mt-12 fixed left-0 top-0 h-full z-10 w-0 bg-white overflow-hidden transition-all duration-300",
          openNav ? 'w-64' : 'md:w-12')}
        onMouseEnter={() => setOpenNav(true)}
        onMouseLeave={() => setOpenNav(false)}
      >
        {navList.map(el => {
          if (el.child) {
            return <ListElement elem={el} key={el.name} openNav={openNav}/>
          }
          return <ElementNavbar elem={el} key={el.name}/>
        })}
      </div>
    </>

  )
}

export default Header