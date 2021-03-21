import React from 'react'


type SelectableButtonTypes = 'primary' | 'secondary' | 'withoutText'

interface IButtonProps {
  icon?: string
  text?: string
  className?: string
  classNameText?: string
  disabled?: boolean
  type: SelectableButtonTypes
  onClick?: (e?: any) => void
}
export const Button: React.FC<IButtonProps> = ({icon, type, text, onClick, className, disabled, classNameText}) => {
  const classes = [
    'rounded-md px-2 py-1 m-2 place-content-center focus:outline-none flex '
  ]

  classes.push(className)

  if (type === 'primary') {
    classes.push('text-white bg-gold')
  } else if (type === 'secondary') {
    classes.push('text-white bg-gray-500')
  } else if (type === 'withoutText') {
    classes.push('text-gray-600 bg-gray-200')
  }

  if(disabled){
    classes.push(' cursor-not-allowed bg-opacity-50')
  }
  return (
    <button
        className={classes.join(' ')}
        onClick={onClick}
        disabled={disabled}
    >
      {icon
          ? <i className="material-icons float-left m-1">{icon}</i>
          : ''
      }
      {text
          ? <span className={"m-1 my-auto " + classNameText}>{text}</span>
          : ''
      }
    </button>
  )
}