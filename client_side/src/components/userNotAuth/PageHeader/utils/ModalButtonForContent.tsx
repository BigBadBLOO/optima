//core
import React from 'react'
import {connect} from "react-redux";

//components
import ModalBodyForLogin from "./ModalBodyForLogin";
import ModalBodyForSignUp from "./ModalBodyForSignUp";

//redux
import {setModalBody} from "@redux/actions/actions";


type ModalButtonForContentType = {
    type: string,
    setModalBody: (elem: any) => void
}

export const ModalButtonForContent: React.FC<ModalButtonForContentType> = ({type, setModalBody}) => {
    return (
        <div className="grid grid-cols-2">
            <div className="text-center cursor-pointer text-xl font-medium">
                <span onClick={() => setModalBody(<ModalBodyForLogin/>)}>Вход</span>
                {
                    type === "login"
                        ? <hr className="border-t-2 mt-2 border-gold"/>
                        : <hr className="border-t-2 mt-2 border-gray"/>
                }
            </div>
            <div className="text-center cursor-pointer text-xl font-medium">
                <span onClick={() => setModalBody(<ModalBodyForSignUp/>)}>Регистрация</span>
                {
                    type === "signUp"
                        ? <hr className="border-t-2 mt-2 border-gold"/>
                        : <hr className="border-t-2 mt-2 border-gray"/>
                }
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch: (arg0: { type: string; elem: any; }) => any) {
    return {
        setModalBody: (elem: any) => dispatch(setModalBody(elem)),
    }
}

export default connect(null, mapDispatchToProps)(ModalButtonForContent)