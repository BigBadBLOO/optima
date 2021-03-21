import React from 'react'
import {Button} from "@components/Base/Button";


type typeValue = 'text' | 'number'

type InputType = {
    icon?: string,
    type?: typeValue,
    value: string,
    className: string,
    placeholder: string,
    label?: string,
    disabled?: boolean,
    setValue: (e: any) => void,
}

export const Input: React.FC<InputType> = ({icon, type = 'text', placeholder, label, className, disabled, value, setValue}) => {

    const classes = [
        'rounded-md border px-2 py-1 m-2 place-content-center '
    ]

    classes.push(className)

    if (disabled) {
        classes.push(' cursor-not-allowed bg-opacity-50')
    }

    return (
        <>
            {
                label && <label>{label}</label>
            }
            <div className={classes.join(' ')}>
                {
                    icon
                        ? <i className="material-icons ml-auto float-left">{icon}</i>
                        : ''
                }
                <input
                    className="focus:outline-none w-full"
                    type={type}
                    onChange={e => {
                        let tempValue = e.target.value
                        if (type === 'number' && !validateNumber(tempValue)) tempValue = value
                        setValue(tempValue)
                    }}
                    placeholder={placeholder}
                    value={value}
                />
            </div>
        </>
    )
}



export const ImageUploader: React.FC = ({image, setImage}) => {

    const hiddenFileInput = React.useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click()
    };

    const handleChange = event => {
        setImage(event.target.files[0]);
    };

    return (
        <>
            {image
                ? (
                    <>
                        <img src={image} className="h-12 w-12 rounded-full" alt='images'/>
                        <span className="my-auto mx-2 text-gray-600" onClick={handleClick}>Изменить</span>
                        <span className="my-auto mx-2 text-gray-600" onClick={() => setImage(null)}>Удалить</span>
                    </>)
                : (
                    <>
                        <Button type="secondary" text="Загрузить" onClick={handleClick}/>

                        <span className="my-auto text-gray-500 text-sm">PNG, JPEG, 100x100 px</span>
                    </>
                )
            }
            <input type="file"
                   ref={hiddenFileInput}
                   onChange={handleChange}
                   style={{display: 'none'}}
                   accept="image/x-png,image/jpeg"
            />

        </>
    );
};


function validateNumber(value: string) {
    return /^\d*$/.test(value)
}