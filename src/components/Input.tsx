import Label from './Label';
import { InputProps } from '@/@types';
import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ name, label, placeholder, width, ...props }, _ref) => {
        const { register } = useFormContext();

        return (
            <section>
                <Label htmlFor={name}>{label}</Label>
                <input
                    placeholder={placeholder}
                    className={`rounded-full p-3 focus:outline-none bg-backgroundSecondary text-zinc-300 text-sm ${width ? width : 'w-auto'} placeholder:pt-2 m-2 mb-4`}
                    {...register(name)}
                    {...props}
                />
            </section>
        );
    }
);

Input.displayName = 'Input';

export default Input;
