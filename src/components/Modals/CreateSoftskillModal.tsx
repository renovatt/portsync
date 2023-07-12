import { ModalFunctionProps, SoftskillSchema } from '@/@types';
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
import Form from '../Form';
import Modal from '../Modal';

const CreateSoftskillModal = ({ closeModal, toggleModal }: ModalFunctionProps) => {
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

    return (
        <FormProvider {...methods}>
            <Modal
                closeModal={closeModal}
                toggleModal={toggleModal}
            >
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
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
                </Form>
            </Modal>
        </FormProvider>
    )
}

export default CreateSoftskillModal;