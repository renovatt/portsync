import { ButtonProps } from '@/@types'

const Button = ({ ...props }: ButtonProps) => {
    return (
        <section
            className={`flex justify-between items-center bg-backgroundSecondary m-1 p-4 ${props.width ? props.width : 'w-80'} h-14 rounded-md cursor-pointer border border-borderPrimary hover:border-textPrimary transition-all`}
            onClick={props.onClick}
            onMouseOver={props.onMouseOver}
        >
            <button
                type={props.type}
                className='flex justify-between items-center w-full text-white bold'>
                {props.title}<svg className='w-6 h-6 mt-2 scale-125'>{props.svg}</svg>
            </button>
        </section>
    )
}

export default Button;