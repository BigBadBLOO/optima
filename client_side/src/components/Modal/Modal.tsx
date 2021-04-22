//core
import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

//styles
import './modal.css'

export interface IModalProps {
    show: boolean,
    showModal: (arg1: boolean) => void
}

const MyModal: React.FC<IModalProps> = ({show, showModal, children}) => {
    return (
        <CSSTransition in={show} timeout={200} unmountOnExit classNames="myModalAnimation">
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-50" onClick={() => showModal(false)}/>
                </div>
                <div className="flex justify-center py-12 px-8">
                    <div
                        className="rounded shadow-xl transform transition-all my-8 sm:max-w-lg w-full"
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="bg-white rounded p-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}


export default MyModal

