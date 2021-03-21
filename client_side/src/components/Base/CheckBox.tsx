import React from 'react'


function CheckBox({className, disabled, isCheck = false, onClick}) {
    const classes = [
        'inline-block w-4 h-4 rounded border mr-2 cursor-pointer '
    ]
    classes.push(className)

    if (disabled) {
        classes.push(' cursor-not-allowed bg-opacity-50')
    }

    if (isCheck) {
        classes.push(' bg-gold')
    }

    return (
        <span onClick={() => onClick(!isCheck)}>
            <input className="hidden" type="checkbox" checked={isCheck}/>
            {
                isCheck
                    ? <i className="material-icons cursor-pointer text-base absolute mr-2 text-white">check</i>
                    : ''
            }
            <span className={classes}/>
        </span>
    )
}

export default CheckBox