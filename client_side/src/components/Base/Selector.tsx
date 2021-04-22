import React, {useState} from "react";
import Select from 'react-select';

// #TODO сделать норальный селектор
type SelectableButtonTypes = 'primary' | 'secondary' | 'modal'

interface ISelectorProps {
    type: SelectableButtonTypes
    value: any,
    onChange: (e?: any) => void
    className?: string,
    isMulti?: boolean
    options: any
}

const primaryStyles = {
    control: styles => ({...styles, backgroundColor: '#B4B4BF', height: "100%"}),
    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
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
        return ({marginLeft: '2px', marginRight: '2px', position: 'relative', color: 'white'})
    },
    singleValue: (styles) => {
        return ({marginLeft: '2px', marginRight: '2px', position: 'relative', color: 'white'})
    },
};

const secondaryStyles = {
    control: styles => ({...styles, backgroundColor: '#B4B4BF', height: "100%"}),
    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
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
        return ({marginLeft: '2px', marginRight: '2px', position: 'relative', color: 'white'})
    },
    singleValue: (styles) => ({
            marginLeft: '2px',
            marginRight: '2px',
            position: 'relative',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }
    )
    // input: styles => {
    //     return { display: 'none'}
    // }
};

const modalStyles = {
    container: styles => {
        return styles
    },
    control: styles => {
        return {
            ...styles,
            ':hover': {
                ...styles[':hover'],
                borderColor: '#E0BB87',
            }
        }
    },
    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
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
                    ? '#E0BB87'
                    : 'data.color',
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled && (isSelected ? '#E0BB87' : null),
            },
        };
    },
    placeholder: (styles) => {
        return ({marginLeft: '2px', marginRight: '2px', position: 'relative'})
    },
    singleValue: (styles) => {
        return ({
            marginLeft: '2px', marginRight: '2px', position: 'relative', overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        })
    },
    input: styles => {
        return {display: 'none'}
    }
};

export const Selector: React.FC<ISelectorProps> = ({type, isMulti = false, value, onChange, options}) => {
    let style = primaryStyles

    if (type === 'secondary') style = secondaryStyles
    else if (type === 'modal') style = modalStyles

    return (
        <Select
            isMulti={isMulti}
            onChange={onChange}
            value={value}
            options={options}
            getOptionValue={option => option.value}
            styles={style}
            placeholder="Выберите..."
        />
    )
}