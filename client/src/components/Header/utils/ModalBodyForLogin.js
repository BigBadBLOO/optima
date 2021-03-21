import React, {useState} from "react"
import {connect} from "react-redux";
import PropTypes from "prop-types";

import ModalButtonForContent from "./ModalButtonForContent";
import {initUser, setModalBody, showModal} from "../../../redux/actions/actions";
import Button from "../../BaseElement/Button"

import workWithServer from "../../../core/workWithServer";
import Input from "../../BaseElement/Input";


ModalBodyForLogin.propTypes = {
  setModalBody: PropTypes.func,
  showModal: PropTypes.func,
  initUser: PropTypes.func
};

function ModalBodyForLogin({setModalBody, showModal, initUser}) {

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);

  const login = (e) => {
    e.preventDefault()
    const validEmail = email && email.includes('@') && email.includes('.')
    const validPassword = !!password
    setValidEmail(validEmail)
    setValidPassword(password)

    if (validEmail && validPassword) {
      workWithServer.login({
        "email": email,
        "password": password
      }).then(initUser).catch(() => setValidEmail(false))
    }
  }

  return (
    <div>
      <ModalButtonForContent type='login'/>
      <form className="pt-4" onSubmit={login}>
        <div className="mb-2">
          <label className="block mb-1" htmlFor="email">
            Эл. почта
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-gold"
            id="email"
            type="text"
            placeholder="Введите эл. почту"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setValidEmail(true)
            }}
          />
          {!validEmail &&
          <p className="text-xs text-red-400 pl-2 mt-1"><i className="material-icons mr-2 text-base align-top">
            warning
          </i>Некорректная почта</p>}
        </div>

        <div className="mb-2">
          <label className="block mb-1" htmlFor="password">
            Пароль
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-gold"
            id="password"
            type="password"
            placeholder="Введите пароль"
            onChange={(e) => {
              setPassword(e.target.value);
              setValidPassword(true)
            }}
          />
          {!validPassword &&
          <p className="text-xs text-red-400 pl-2 mt-1"><i className="material-icons mr-2 text-base align-top">
            warning
          </i>Некорректный пароль</p>}
        </div>

        <div className="my-2 text-gray-600">
          <span className="cursor-pointer" onClick={() => {
            setModalBody(<ModalBodyForForgottenPassword initUser={initUser} setModalBody={setModalBody} showModal={showModal}/>)
          }}>Забыли пароль?</span>
        </div>
        <div className="mb-2 text-center">
          <Button className="mx-0 w-full" text="Войти в аккаунт" type="primary"/>
        </div>
      </form>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    initUser: (user) => dispatch(initUser(user)),
    setModalBody: (elem) => dispatch(setModalBody(elem)),
    showModal: (type) => dispatch(showModal(type)),
  }
}

export default connect(null, mapDispatchToProps)(ModalBodyForLogin)


ModalBodyForForgottenPassword.propTypes = {
  setModalBody: PropTypes.func,
  showModal: PropTypes.func,
  initUser: PropTypes.func,
};

function ModalBodyForForgottenPassword({setModalBody, showModal, initUser}) {

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);

  const restorePassword = (e) => {
    e.preventDefault()
    const validEmail = email && email.includes('@') && email.includes('.')
    setValidEmail(validEmail)
    if (validEmail) {
      workWithServer.restorePassword({
        "email": email,
      }).then((data) => {
        setModalBody(<ModalBodyForCode email={email} showModal={showModal} initUser={initUser} code={data['code']} setModalBody={setModalBody}/>)
      }).catch(() => setValidEmail(false))
    }
  }

  return (
    <div className="mx-2">
      <p className="font-semibold text-xl md:text-2xl text-center my-2">
        Восстановление доступа
      </p>
      <p className="text-center my-2">
        Введите эл. почту на которую зарегистрирован ваш аккаунт
      </p>
      <Input className="mx-0 my-2" placeholder="Введите эл. почту" value={email} setValue={setEmail}/>
      {!validEmail &&
      <p className="text-xs text-red-400 pl-2 mt-1"><i className="material-icons mr-2 text-base align-top">
        warning
      </i>Некорректная почта</p>}
      <Button className="mx-0 w-full" type="primary" text="Продолжить" onClick={restorePassword}/>
    </div>
  )
}


ModalBodyForCode.propTypes = {
  code: PropTypes.string,
  setModalBody: PropTypes.func,
  showModal: PropTypes.func,
  initUser: PropTypes.func,
  email: PropTypes.string,
};

function ModalBodyForCode({code, setModalBody, email, initUser, showModal}) {
  const [inputCode, setInputCode] = useState('');
  const [validCode, setValidCode] = useState(true);

  return (
    <div className="mx-2">
      <p className="font-semibold text-xl md:text-2xl text-center my-2">
        Восстановление доступа
      </p>
      <p className="text-center my-2">
        Введите код, отправленный Вам на эл. почту
      </p>
      <Input className="mx-0 my-2" placeholder="Введите код" value={inputCode} setValue={(data) => {
        setInputCode(data)
        setValidCode(true)
      }}/>
      {!validCode &&
      <p className="text-xs text-red-400 pl-2 mt-1"><i className="material-icons mr-2 text-base align-top">
        warning
      </i>Некорректный код</p>}
      <Button className="mx-0 w-full" type="primary" text="Применить" onClick={() => {
        setValidCode(code === inputCode)
        validCode && setModalBody(<ModalBodyForChangePassword code={code} email={email} showModal={showModal} initUser={initUser}/>)
      }}/>
    </div>
  )
}


ModalBodyForChangePassword.propTypes = {
  showModal: PropTypes.func,
  initUser: PropTypes.func,
  email: PropTypes.string,
  code: PropTypes.string,
};

function ModalBodyForChangePassword({showModal, initUser, email, code}) {
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);

  const sendPassword = () => {
    const passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])")
    const validPassword = password.length >= 8 && passwordRegex.test(password)
    setValidPassword(validPassword)
    if (validPassword) {
      workWithServer.setNewPassword({
        email: email,
        code: code,
        password: password
      }).then((data) => {
        initUser(data)
        showModal(false)
      }).catch(() => {
        setValidPassword(false)
      })
    }
  }

  return (
    <div className="mx-2">
      <p className="font-semibold text-xl md:text-2xl text-center my-2">
        Восстановление доступа
      </p>
      <p className="text-center my-2">
        Введите новый пароль
      </p>
      <Input className="mx-0 my-2" placeholder="Введите новый пароль" value={password} setValue={(data) => {
        setPassword(data)
        setValidPassword(true)
      }}/>
      {!validPassword &&
      <p className="text-xs text-red-400 pl-2 mt-1"><i className="material-icons mr-2 text-base align-top">
        warning
      </i>Пароль должен состоять из не менее 8 латинских символов, 1 заглавной буквы, и 1 цифры</p>}
      <Button className="mx-0 w-full" type="primary" text="Применить" onClick={() => {
        sendPassword()
      }}/>
    </div>
  )
}