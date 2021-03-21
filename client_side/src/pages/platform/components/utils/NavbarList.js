import React from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ElementNavbar, {ListElement} from "./ElementNavbar";

function NavbarList({navMenu, platform, openNav}) {

  const listItem = navMenu.map(el => {
    if (el.children) {
      return <ListElement elem={el} key={el.name} pathToPlatform={platform.pathToPlatform}
                          activePage={platform.activePage} openNav={openNav}/>
    }
    return <ElementNavbar elem={el} key={el.name} pathToPlatform={platform.pathToPlatform}
                    active={platform.activePage === el.href}/>
  })

  return (
    <div className="mt-2">
      {listItem}
    </div>
  )
}

NavbarList.propTypes = {
  navMenu: PropTypes.object,
  platform: PropTypes.object,
  openNav: PropTypes.bool,
}


function mapStateToProps(state) {
  return {
    platform: state.platform,
  }
}

export default connect(mapStateToProps)(NavbarList)