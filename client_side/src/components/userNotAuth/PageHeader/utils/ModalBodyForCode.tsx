import React, {useState} from "react";
import {Input} from "@components/Base/Input";
import {Button} from "@components/Base/Button";
import ModalBodyForChangePassword from "@components/Headers/HeaderNonAuthUser/utils/ModalBodyChangePassword";

function ModalBodyForCode({code, setModalBody, email, showModal}) {
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
                validCode && setModalBody(<ModalBodyForChangePassword code={code} email={email} showModal={showModal}/>)
            }}/>
        </div>
    )
}

