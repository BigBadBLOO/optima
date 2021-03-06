//core
import React, {useState} from "react";
import {Link} from "react-router-dom";
import clsx from "clsx";
import CSSTransition from "react-transition-group/CSSTransition";

//styles
import './elementNavbar.css'

interface Elem {
  path?: string
  active?: boolean
  icon?: string
  name: string
  child?: Array<Elem>
}

interface ElementNavbar {
  elem : Elem
}

export const ElementNavbar: React.FC<ElementNavbar> = ({elem}) => {

  return (
    <Link className="flex cursor-pointer text-sm whitespace-nowrap" to={`${elem.path}`}>
      <hr className={elem.active ? 'absolute h-12 border border-gold' : 'hidden'}/>

      <span className={clsx("material-icons text-gray-500 p-3", {'text-gold': elem.active})}>
          {elem.icon}
      </span>
      <span className={clsx("align-middle my-auto text-gray-500 pl-1 ", {'text-gold': elem.active})}>
          {elem.name}
      </span>
    </Link>
  )
}

type ListElement = {
  elem: Elem
  openNav: boolean
}

export const ListElement: React.FC<ListElement> = ({elem, openNav}) => {
  const [show, setShow] = useState(false)

  let active_root_nav = false

  const list = elem.child.map((el: Elem ) => {

    if (el.active) active_root_nav = true

    return <Link className="flex cursor-pointer text-sm" to={`${el.path}`} key={el.name}>
      <span className={clsx("align-middle my-2 text-gray-500 pl-1", {'text-gold': el.active})}>
        {el.name}
      </span>
    </Link>
  })

  return (
    <>
      <div className="flex cursor-pointer justify-between text-sm " onClick={() => setShow(!show)}>
        <div className="flex whitespace-nowrap">
          <hr className={active_root_nav ? 'absolute h-12 border border-gold' : 'hidden'}/>
          <span className={clsx("material-icons text-gray-500 p-3", {'text-gold': active_root_nav})}>
            {elem.icon}
          </span>
          <span className={clsx("align-middle my-auto text-gray-500 pl-1 ", {'text-gold': active_root_nav})}>
            {elem.name}
          </span>
        </div>
        <span
          className={clsx("material-icons align-middle my-auto p-3 text-gray-600 float-right transition duration-500 " +
            "ease-in-out", {'transform rotate-180 ': show})}>
          keyboard_arrow_down
        </span>
      </div>
      <CSSTransition in={show && openNav} timeout={500} unmountOnExit classNames="myNavbarAnimation">
        <div className="ml-12 whitespace-nowrap">
          {list}
        </div>
      </CSSTransition>
    </>
  )
}