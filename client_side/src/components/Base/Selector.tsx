import React, {useState} from "react";
import Select from 'react-select';

type SelectableButtonTypes = 'primary' | 'secondary'

interface ISelectorProps {
  type: SelectableButtonTypes
  value: any,
  onChange: (e?: any) => void
  className?: string,
  options: any
}

const customStyles = {
  control: styles => ({ ...styles, backgroundColor: '#B4B4BF', height: "100%" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = data.color;
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
          ? data.color
          : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : null),
      },
    };
  },
  placeholder: (styles) => {
    return ({ marginLeft: '2px', marginRight: '2px', position: 'relative' , color: 'white'})
  },
  singleValue: (styles) => {
    return ({ marginLeft: '2px', marginRight: '2px', position: 'relative' , color: 'white'})
  },
};

export const Selector: React.FC<ISelectorProps> = ({type, value, onChange, className, options}) => {

  const classes = [
    // 'rounded-md relative p-2 text-left cursor-pointer focus:outline-none'
  ]

  classes.push(className)

  if (type === 'primary') classes.push('text-white bg-gold hover:bg-gold-hover')
  else if (type === 'secondary') classes.push('text-white bg-myGray hover:bg-myGray-hover')

  return (
    <Select
      onChange={onChange}
      value={value}
      options={options}
      getOptionValue={option => option.value}
      styles={customStyles}
    />
  )
}