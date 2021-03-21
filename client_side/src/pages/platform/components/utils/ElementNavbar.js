import {Link} from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, {useState} from "react";

function ElementNavbar({elem, active, pathToPlatform}) {

  return (
    <Link className="flex cursor-pointer" to={`${pathToPlatform + elem.href}`}>
      <hr className={active ? 'absolute h-12 border border-gold' : 'hidden'}/>

      <span className={clsx("material-icons text-gray-600 p-3", {'text-gold': active})}>
          {elem.icon}
        </span>
      <span className={clsx("align-middle my-auto text-gray-600 pl-1 ", {'text-gold': active})}>
          {elem.name}
        </span>
    </Link>
  )
}

ElementNavbar.propTypes = {
  elem: PropTypes.object,
  active: PropTypes.bool,
  pathToPlatform: PropTypes.string,
}


function ListElement({elem, pathToPlatform, activePage, openNav}) {
  const [show, setShow] = useState(false)

  const list = elem.children.map((el) => {
    const active = activePage === el.href

    return <Link className="flex cursor-pointer" to={`${pathToPlatform + el.href}`} key={el.name}>
      <span className={clsx("align-middle my-auto text-gray-600 pl-1", {'text-gold': active})}>
        {el.name}
      </span>
    </Link>
  })
  return (
    <>
      <div className="flex cursor-pointer justify-between" onClick={() => setShow(!show)}>
        <div className="flex">
          <span className={clsx("material-icons text-gray-600 p-3")}>
            {elem.icon}
          </span>
          <span className={clsx("align-middle my-auto text-gray-600 pl-1")}>
            {elem.name}
          </span>
        </div>
        <span
          className={clsx("material-icons align-middle my-auto p-3 text-gray-600 float-right transition duration-500 " +
            "ease-in-out", { 'transform rotate-180 ': show })}>
          keyboard_arrow_down
        </span>

      </div>
      <div
        className={clsx("ml-12 opacity-0", (show && openNav ? 'block opacity-100  transition duration-500 ease-in-out'
          : 'hidden'))}>
        {list}
      </div>
    </>
  )
}

ListElement.propTypes = {
  elem: PropTypes.object,
  activePage: PropTypes.string,
  pathToPlatform: PropTypes.string,
  openNav: PropTypes.bool,
}

export default ElementNavbar
export {ListElement}