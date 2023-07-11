import { ModalTypeProps, SoftskillSchema } from '@/@types';
import { RiCloseCircleLine } from 'react-icons/ri'
import Input from '../Input';
import { Field } from '../Field';
import { BsSend } from 'react-icons/bs';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { softskillSchema } from '@/zod';
import { ErrorMessage } from '../ErrorMessage';
import Button from '../Button';
import { toast } from 'react-toastify';

const CreateSoftskillModal = ({ closeModal, toggleModal }: ModalTypeProps) => {
    const [loading, setLoading] = useState(false)

    const methods = useForm<SoftskillSchema>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(softskillSchema)
    });

    const onSubmit = async (data: SoftskillSchema) => {
        setLoading(true);
        try {
            console.log(data)
            toast.success('Salvo com sucesso!')
            closeModal()
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (error) {
            console.log(error)
            toast.error('Aconteceu algum erro!')
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = (
        event: React.MouseEvent<HTMLElement> |
            React.TouchEvent<HTMLElement>
    ) => {
        if (event.target === event.currentTarget) {
            toggleModal();
        }
    }

    return (
        <FormProvider {...methods}>
            <section
                onClick={(event) => handleCloseModal(event)}
                className='flex items-center justify-center fixed top-0 left-0 z-[50] w-screen h-screen bg-backgroundShadow backdrop-blur-sm overflow-y-auto animate-fade py-8'
            >

                <section
                    className='relative flex items-start justify-between md:max-h-[800px] md:h-[85vh] w-[90%] max-w-6xl rounded-lg p-4 flex-col bg-backgroundPrimary m-auto overflow-y-auto overflow-x-hidden-textPrimary border border-zinc-600 md:border-none'
                >
                    <RiCloseCircleLine
                        className='text-white absolute top-4 right-4 w-6 h-6 cursor-pointer hover:text-textPrimary transition-all'
                        onClick={closeModal}
                    />

                    <form
                        className='md:w-auto w-full md:m-4'
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <section className='flex'>
                            <Field>
                                <Input
                                    name='softskill_name'
                                    label='Nome da competência'
                                    placeholder='Resiliência'
                                />
                                <ErrorMessage field='softskill_name' />
                            </Field>
                        </section>

                        <Button
                            type='submit'
                            title='Enviar'
                            width='w-40'
                            svg={<BsSend className='text-white w-6 h-6' />}
                        />
                    </form>
                </section>
            </section>
        </FormProvider>
    )
}

export default CreateSoftskillModal;