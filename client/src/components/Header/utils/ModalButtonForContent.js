import React from 'react'
import PropTypes from "prop-types";
import ModalBodyForLogin from "./ModalBodyForLogin";
import ModalBodyForSignUp from "./ModalBodyForSignUp";
import {connect} from "react-redux";
import {setModalBody} from "../../../redux/actions/actions";

function ModalButtonForContent(props) {
  return (
    <div className="grid grid-cols-2">
      <div className="text-center cursor-pointer text-xl font-medium">
        <span onClick={() => {
          props.setModalBody(<ModalBodyForLogin/>)
        }}>Вход</span>
        {props.type === "login" ? <hr className="border-t-2 mt-2 border-gold"/> :
          <hr className="border-t-2 mt-2 border-gray"/>}
      </div>
      <div className="text-center cursor-pointer text-xl font-medium">
        <span onClick={() => {
          props.setModalBody(<ModalBodyForSignUp/>)
        }}>Регистрация</span>
        {props.type === "signUp" ? <hr className="border-t-2 mt-2 border-gold"/> :
          <hr className="border-t-2 mt-2 border-gray"/>}
      </div>
    </div>
  )
}

ModalButtonForContent.propTypes = {
  type: PropTypes.string,
  setModalBody: PropTypes.func
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    setModalBody: (elem) => dispatch(setModalBody(elem)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalButtonForContent)