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
            console.log('Salvo com sucesso.')
        } catch (error) {
            console.log(error)
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
                className='flex items-center justify-center fixed top-0 left-0 z-[50] w-screen h-screen  bg-backgroundShadow backdrop-blur-sm overflow-y-auto animate-fade'
            >

                <section
                    className='relative flex items-start justify-between h-auto md:max-h-[800px] max-h-[initial] md:h-[85vh] w-[80%] max-w-6xl rounded-lg p-4 flex-col md:flex-row bg-backgroundPrimary md:mt-0 mt-[20rem] md:mb-0 mb-10 overflow-y-auto'
                >
                    <RiCloseCircleLine
                        className='text-white absolute top-4 right-4 w-6 h-6 cursor-pointer hover:text-textPrimary transition-all'
                        onClick={closeModal}
                    />

                    <form
                        className='w-full m-4'
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