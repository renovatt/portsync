import React from 'react'
import Label from './Label';

type InputProps = {
    name?: string;
    label: string;
    placeholder: string;
    width?: string;
}

const Input = ({ ...props }: InputProps) => {
    return (
        <>
            <Label htmlFor={props.name}>{props.label}</Label>
            <input
                className={`rounded-full p-3 focus:outline-none bg-backgroundSecondary text-zinc-300 text-sm m-1 ${props.width ? props.width : 'w-auto'} placeholder:pt-2 mb-8 mx-2 `}
                {...props}
            />
        </>
    )
}

export default Input