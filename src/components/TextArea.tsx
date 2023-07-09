import { useFormContext } from 'react-hook-form'
import { forwardRef } from 'react';
import Label from "./Label"

type InputProps = {
    name: string;
    label: string;
    placeholder: string;
    width?: string;
    rows?: number;
}

const TextArea = forwardRef<HTMLInputElement, InputProps>(
    ({ name, label, placeholder, rows, width, ...props }, _ref) => {
        const { register } = useFormContext()

        return (
            <>
                <Label htmlFor={name}>{label}</Label>
                <textarea
                    className={`rounded-lg p-3 shadow-sm focus:outline-none bg-backgroundSecondary text-zinc-300 text-sm m-1 ${width ? width : 'w-auto'} max-h-40 mb-2 mx-2 placeholder:text-sm`}
                    placeholder={placeholder}
                    cols={50}
                    rows={rows ? rows : 4}
                    maxLength={1000}
                    {...register(name)}
                    {...props}
                >
                </textarea>
            </>
        )
    })

TextArea.displayName = 'TextArea';

export default TextArea;