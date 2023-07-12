import { FormProps } from "@/@types"

const Form = ({ children, onSubmit }: FormProps) => {
    return (
        <form
            onSubmit={onSubmit}
            className='md:w-auto w-full md:m-4'>
            {children}
        </form>
    )
}

export default Form;