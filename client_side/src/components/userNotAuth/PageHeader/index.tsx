//core
import React, {useState} from "react";

//components
import Logo from "@components/Base/Logo/Logo";
import MyModal from "@components/Modal/Modal";
import ModalHeader from "./Modal/ModalHeader";
import ModalBodyForLogin from "@components/userNotAuth/PageHeader/utils/ModalBodyForLogin";
import {LinkForScroll} from "@components/userNotAuth/PageHeader/utils/utils";

interface IHeader {
    refToPossibility?: React.Ref<any>,
    refToTariff?: React.Ref<any>,
    refToModules?: React.Ref<any>
}

const PageHeader:React.FC<IHeader> = ({ refToPossibility, refToTariff, refToModules}) => {
    const [showLogin, setShowLogin] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)

    const login = () => setShowLogin(true)
    const signUp = () =>  setShowSignUp(true)

    return (
        <div className="p-4 flex justify-between">
            <Logo/>
            <div className="hidden md:flex md:mx-auto items-center justify-center">
                <LinkForScroll text="Возможности" ref={refToPossibility}/>
                <LinkForScroll text="Тарифы" ref={refToTariff}/>
                <LinkForScroll text="Собрать платформу" ref={refToModules}/>
            </div>
            <div className="flex justify-end items-center">
                <span className="text-gold px-2 cursor-pointer" onClick={login}>Вход</span>
                <span className="text-gold px-2 cursor-pointer" onClick={signUp}>Регистрация</span>
            </div>

            <MyModal show={showLogin} showModal={setShowLogin}>
                <ModalHeader/>
                <ModalBodyForLogin/>
            </MyModal>

            <MyModal show={showSignUp} showModal={setShowSignUp}>
                <ModalHeader/>
            </MyModal>

        </div>
    )
}


export default PageHeader