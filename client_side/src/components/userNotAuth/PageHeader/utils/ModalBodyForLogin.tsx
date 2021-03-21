//core
import React, {useState} from "react"

//components
import ModalButtonForContent from "./ModalButtonForContent";
import {Button} from "@components/Base/Button";
import ModalBodyForForgottenPassword from "./ModalBodyForgottenPassword";
import {useMutation, useQuery} from "@apollo/client";

//request
import LoginUser from '@gql/loginUser.gql'

const ModalBodyForLogin: React.FC = () => {

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);

    const [loginMutation] = useMutation(LoginUser);
    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const validEmail = email && email.includes('@') && email.includes('.')
        const validPassword = !!password
        setValidEmail(validEmail)
        setValidPassword(validPassword)

        if (validEmail && validPassword) {
            console.log('here')
            loginMutation({
                variables: {
                    loginData: {
                        email,
                        password
                    }
                }
            }).then(r => console.log(r))
            // workWithServer.login( {
            //   "email": email,
            //   "password": password
            // }).then(initUser).catch(() => setValidEmail(false))
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
                    {
                        !validEmail &&
                        <p className="text-xs text-red-400 pl-2 mt-1">
                            <i className="material-icons mr-2 text-base align-top">warning</i>
                            Некорректная почта
                        </p>
                    }
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
                    {
                        !validPassword &&
                        <p className="text-xs text-red-400 pl-2 mt-1">
                            <i className="material-icons mr-2 text-base align-top">warning</i>
                            Некорректный пароль
                        </p>
                    }
                </div>

                <div className="my-2 text-gray-600">
          <span
              className="cursor-pointer"
              onClick={() => {
                  // setModalBody(<ModalBodyForForgottenPassword setModalBody={setModalBody} showModal={showModal}/>)
              }}
          >Забыли пароль?</span>
                </div>
                <div className="mb-2 text-center">
                    <Button className="mx-0 w-full" text="Войти в аккаунт" type="primary"/>
                </div>
            </form>
        </div>
    )
}

export default ModalBodyForLogin











