// import { useFormContext } from 'react-hook-form'

import Label from "./Label"

type InputProps = {
    name?: string;
    label: string;
    placeholder: string;
    width?: string;
    rows?: number;
}

const TextArea = ({ ...props }: InputProps) => {
    // const { register } = useFormContext()

    return (
        <>
            <Label htmlFor={props.name}>{props.label}</Label>
            <textarea
                className={`rounded-lg p-3 shadow-sm focus:outline-none bg-backgroundSecondary text-zinc-300 text-sm m-1 ${props.width ? props.width : 'w-auto'} max-h-40 mb-8 mx-2 placeholder:text-sm`}
                cols={50}
                rows={props.rows ? props.rows : 4}
                maxLength={1000}
                // {...register('message')}
                {...props}
            >
            </textarea>
        </>
    )
}

export default TextArea;