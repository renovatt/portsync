import { ButtonProps } from '@/@types'

const Button = ({ ...props }: ButtonProps) => {
    return (
        <section
            className={`flex justify-between items-center bg-backgroundSecondary m-1 p-4 ${props.width ? props.width : 'w-80'} h-14 rounded-md cursor-pointer border border-borderPrimary hover:border-textPrimary transition-all`}
            onClick={props.onClick}
        >
            <button
                type={props.type}
                className={`flex justify-between items-center w-full text-white bold`}>
                <p className={`${props.textHidden ? props.textHidden : 'flex'}`}>{props.title}</p>
                <svg className='w-6 h-6 mt-2 pl-1 scale-125'>{props.svg}</svg>
            </button>
        </section>
    )
}

export default Button;