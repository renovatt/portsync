import { Children } from "@/@types"

const GridNameInputs = ({ children }: Children) => {
    return (
        <section className='flex justify-start items-center my-8'>
            {children}
        </section>
    )
}

const GridLinksInputs = ({ children }: Children) => {
    return (
        <section className='flex md:flex-row flex-col my-8'>
            {children}
        </section>
    )
}

const GridTextAreaInput = ({ children }: Children) => {
    return (
        <section className='flex flex-col justify-start items-start my-4'>
            {children}
        </section>
    )
}

export { GridNameInputs, GridLinksInputs, GridTextAreaInput }
