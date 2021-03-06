//core
import React from "react";

//components
import {Button} from "@components/Base/Button";

//hooks
import useLogin from "@components/userNotAuth/PageHeader/Modal/hooks/useLogin";


const ModalBodyLogin: React.FC = () => {
  const data = useLogin()

  return (
    <form className="pt-4" onSubmit={data.login}>
      <div className="mb-2">
        <label className="block mb-1" htmlFor="email">
          Эл. почта
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-600 text-opacity-75 focus:outline-none focus:border-gold"
          id="email"
          type="text"
          placeholder="Введите эл. почту"
          value={data.email}
          onChange={(e) => {
            data.setEmail(e.target.value);
            data.setErrorEmail('')
          }}
        />
        {
          data.errorEmail &&
          <p className="text-xs text-red-400 pl-2 mt-1 ">
              <i className="material-icons mr-2 text-base align-middle">warning</i>
              <span className="my-auto">{data.errorEmail}</span>
          </p>
        }
      </div>

      <div className="mb-2">
        <label className="block mb-1" htmlFor="password">
          Пароль
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-600 text-opacity-75 focus:outline-none focus:border-gold"
          id="password"
          type="password"
          placeholder="Введите пароль"
          onChange={(e) => {
            data.setPassword(e.target.value);
            data.setValidPassword(true)
          }}
        />
        {
          !data.validPassword &&
          <p className="text-xs text-red-400 pl-2 mt-1">
              <i className="material-icons mr-2 text-base align-middle">warning</i>
              Некорректный пароль
          </p>
        }
      </div>

      <div className="my-2 mb-8 text-gray-600">
          <span
            className="cursor-pointer"
            onClick={() => {
              // setModalBody(<ModalBodyForForgottenPassword setModalBody={setModalBody} showModal={showModal}/>)
            }}
          >Забыли пароль?
          </span>
      </div>
      <div className="mb-2 text-center">
        <Button className="mx-0 w-full" text="Войти в аккаунт" type="primary" submit={true}/>
      </div>
    </form>
  )
}

export default ModalBodyLogin