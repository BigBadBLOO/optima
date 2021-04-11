import React, {ChangeEventHandler} from 'react'
import clsx from "clsx";

type TypeICheckBox = 'indeterminate'

interface ICheckBox {
    type: TypeICheckBox
    className?: string,
    disabled?: boolean,
    checked?: boolean,
    onChange: ChangeEventHandler<HTMLInputElement>,
    title: string,
    style: object,
    indeterminate: string | boolean
}

const CheckBox: React.FC<ICheckBox> = ({type, className, disabled, checked = false, onChange, title, style, indeterminate}) => {

    const classes = [
        'bg-white border-2 rounded border-gray-400 w-4 h-4 flex flex-shrink-0 justify-center items-center focus-within:border-gold'
    ]

    classes.push(className)

    if (disabled) {
        classes.push('cursor-not-allowed bg-opacity-50')
    }

    if (checked) {
        classes.push('border-gold bg-gold')
    }

    return (
        <div className={classes.join(' ')} title={title}>
            <input className="absolute opacity-0 z-10" type="checkbox" checked={checked} onChange={onChange}/>
            {
                indeterminate
                    ? '-'
                    : <svg
                        className={clsx("fill-current opacity-0 w-2 h-2 text-white pointer-events-none", {"opacity-100": checked})}
                        viewBox="0 0 20 20">
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                    </svg>
            }
            {/*<span className={classes.join(' ')}/>*/}
        </div>
    )
}

export default CheckBox