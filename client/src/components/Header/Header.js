import React, {useState} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {cancelConfirmEmail, initUser, setModalBody, setModalHeader, showModal} from "../../redux/actions/actions";
import Logo from "../Logo/Logo";

import ModalHeader from "./utils/ModalHeader";
import ModalBodyForLogin from "./utils/ModalBodyForLogin";
import ModalBodyForSignUp from "./utils/ModalBodyForSignUp";
import {
  LinkForAuthUser,
  NavBalance,
  NavDocumentation,
  NavNotification,
  NavUser
} from "./utils/utils";


Header.propTypes = {
  user: PropTypes.object,
  cancelConfirmEmail: PropTypes.func,
  initUser: PropTypes.func,
};

function Header({user, cancelConfirmEmail, initUser}) {

  const initStateForNav = {
    balance: false,
    notifications: false,
    user: false
  }
  const [openNav, setOpenNav] = useState(initStateForNav)

  return (
    <>
      {
        !user.emailIsConfirm &&
        <div className="text-center text-white bg-blue-600 px-1">
          Подтвердите адрес электронной почты
          <span className="float-right margin-border-10" onClick={cancelConfirmEmail}>x</span>
        </div>
      }

      <div className="flex justify-between h-16 p-2 bg-white">
        <Logo/>
        <div className="md:divide-x divide-gray-400 divide-opacity-50">
          <NavDocumentation/>
          <NavBalance balance={user.balance} openNav={openNav} setOpenNav={setOpenNav} initStateForNav={initStateForNav}/>

          <span className="text-gray-500">
            <NavNotification openNav={openNav} setOpenNav={setOpenNav} initStateForNav={initStateForNav}/>
            <NavUser user={user} initUser={initUser} openNav={openNav} setOpenNav={setOpenNav} initStateForNav={initStateForNav}/>
          </span>
        </div>
      </div>
    </>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cancelConfirmEmail: () => dispatch(cancelConfirmEmail()),
    initUser: (user) => dispatch(initUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)


HeaderForNonAuthUserBase.propTypes = {
  showModal: PropTypes.func,
  setModalHeader: PropTypes.func,
  setModalBody: PropTypes.func,
  refToPossibility: PropTypes.object,
  refToTariff: PropTypes.object,
  refToModules: PropTypes.object,
};

function HeaderForNonAuthUserBase({setModalHeader, setModalBody, showModal, refToPossibility, refToTariff, refToModules}) {

  const login = () => {
    setModalHeader(<ModalHeader/>)
    setModalBody(<ModalBodyForLogin/>)
    showModal()
  }
  const signUp = () => {
    setModalHeader(<ModalHeader/>)
    setModalBody(<ModalBodyForSignUp/>)
    showModal()
  }

  return (
    <div className="p-4 flex justify-between">
      <Logo/>
      <div className="hidden md:flex md:ml-32 items-center justify-center">
        <LinkForAuthUser text="Возможности" ref={refToPossibility}/>
        <LinkForAuthUser text="Тарифы" ref={refToTariff}/>
        <LinkForAuthUser text="Собрать платформу" ref={refToModules}/>
      </div>
      <div className="flex justify-end items-center">
        <span className="text-gold px-2 cursor-pointer" onClick={login}>Вход</span>
        <span className="text-gold px-2 cursor-pointer" onClick={signUp}>Регистрация</span>
      </div>
    </div>
  )
}

function mapDispatchToPropsSecond(dispatch) {
  return {
    showModal: () => dispatch(showModal()),
    setModalHeader: (elem) => dispatch(setModalHeader(elem)),
    setModalBody: (elem) => dispatch(setModalBody(elem)),
  }
}

const HeaderForNonAuthUser = connect(null, mapDispatchToPropsSecond)(HeaderForNonAuthUserBase)

export {
  HeaderForNonAuthUser
}


