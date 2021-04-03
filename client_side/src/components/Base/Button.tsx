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
    'rounded-md p-2 place-content-center focus:outline-none flex '
  ]

  classes.push(className)

  if (type === 'primary') classes.push('text-white bg-gold hover:bg-gold-hover')
  else if (type === 'secondary') classes.push('text-white bg-myGray hover:bg-myGray-hover')
  // else if (type === 'withoutText') classes.push('text-gray-600 bg-gray-200')

  if (disabled) classes.push(' cursor-not-allowed bg-opacity-50')

  return (
    <button
      className={classes.join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {
        icon
          ? <i className="material-icons float-left mr-1">{icon}</i>
          : ''
      }
      {
        text
          ? <span className={"m-1 my-auto " + classNameText}>{text}</span>
          : ''
      }
    </button>
  )
}