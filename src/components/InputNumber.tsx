import { InputProps } from '@/@types';
import Label from './Label';
import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ name, label, placeholder, width, ...props }, _ref) => {
        const { register } = useFormContext();

        return (
            <div>
                <Label htmlFor={name}>{label}</Label>
                <input
                    type='number'
                    placeholder={placeholder}
                    className={`rounded-full p-3 focus:outline-none bg-backgroundSecondary text-zinc-300 text-sm m-1 ${width ? width : 'w-auto'} placeholder:pt-2 mb-1 mx-2 `}
                    {...register(name, { setValueAs: (value: string) => parseInt(value, 10) })}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
