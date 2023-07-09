export const Loader = () => {
    return (
        <section className='absolute flex items-center justify-center flex-col h-screen w-screen py-0 px-24 bg-backgroundPrimary z-50'>
            <h2 className='text-xl text-textPrimary mb-4 font-bold text-center'>Carregando..</h2>
            <span className='h-1 w-96 max-w-full rounded-full relative'>
                <span className='absolute top-0 left-0 h-1 w-0 bg-textPrimary rounded-full animate-load'></span>
            </span>
        </section>
    )
}