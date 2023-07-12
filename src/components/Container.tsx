import { Children } from '@/@types'

export const Container = ({ children }: Children) => {
    return (
        <main className='flex flex-1 items-center justify-center flex-col min-h-[90vh]'>
            {children}
        </main>
    )
}