import React, {useState} from "react"
import {connect} from "react-redux";
import PropTypes from "prop-types";

import Button from "../../BaseElement/Button"
import ModalButtonForContent from "./ModalButtonForContent";
import {initUser, showModal} from "../../../redux/actions/actions";
import workWithServer from "../../../core/workWithServer";
import {Link} from "react-router-dom";
import CheckBox from "../../BaseElement/CheckBox";


ModalBodyForSignUp.propTypes = {
  initUser: PropTypes.func,
  showModal: PropTypes.func,
};


function ModalBodyForSignUp({initUser, showModal}) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [validName, setValidName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validPassword2, setValidPassword2] = useState(true);

  const [agreement, setAgreement] = useState(false);

  const signUp = (e) => {
    e.preventDefault()
    const validName = !!name
    const validEmail = email && email.includes('@') && email.includes('.')
    const passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])")
    const validPassword = password.length >= 8 && passwordRegex.test(password)
    const validPassword2 = password === password2
    setValidName(validName)
    setValidEmail(validEmail)
    setValidPassword(validPassword)
    setValidPassword2(validPassword2)

    if (validEmail && validPassword && agreement) {
      workWithServer.signUp({
        "name": name,
        "email": email,
        "password": password
      }).then(initUser, () => setValidEmail(false))
    }
  }

  return (
    <div>
      <ModalButtonForContent type='signUp'/>
      <form className="pt-4" onSubmit={signUp}>
        <div className="mb-2">
          <label className="block mb-1" htmlFor="name">
            Ваше имя
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-gold"
            id="name"
            type="text"
            placeholder="Введите имя"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setValidName(true)
            }}
          />
          {!validName && <p className="text-xs text-red-400 pl-2 mt-1"><i className="material-icons mr-2 text-base align-top">
          warning
          </i>Неверное имя</p>}
        </div>
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
          </i>Некорректная почта или уже зарегистрирована</p>}
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
          </i>Пароль должен состоять из не менее 8 латинских символов, 1 заглавной буквы, и 1 цифры</p>}
        </div>
        <div className="mb-2">
          <label className="block mb-1" htmlFor="password2">
            Подтвердите пароль
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-gold"
            id="password2"
            type="password"
            placeholder="Введите пароль"
            onChange={(e) => {
              setPassword2(e.target.value);
              setValidPassword2(true)
            }}
          />
          {!validPassword2 && <p className="text-xs text-red-400 pl-2 mt-1"><i className="material-icons mr-2 text-base align-top">
          warning
          </i>Пароли не совпадают</p>}
        </div>
        <div className="my-4">
          <CheckBox isCheck={agreement} onClick={setAgreement}/>
          <span>
            Я принимаю
            <Link to="/userAgreement/"> <u onClick={() => showModal(false)}>пользовательское соглашение</u></Link> и
            <Link to="/privacyPolicy/"> <u onClick={() => showModal(false)}>политику конфедициальности</u></Link>
          </span>
        </div>
        <div className="mb-4 text-center">
          <Button className="mx-0 w-full" text="Зарегистрироваться" type="primary"/>
        </div>
      </form>

    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    initUser: (user) => dispatch(initUser(user)),
    showModal: (type) => dispatch(showModal(type)),
  }
}

export default connect(null, mapDispatchToProps)(ModalBodyForSignUp)
