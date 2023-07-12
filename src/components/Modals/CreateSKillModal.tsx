import { useState } from 'react';
import Input from '../Input';
import TextArea from '../TextArea';
import Button from '../Button';
import { Field } from '../Field';
import { BsSend } from 'react-icons/bs';
import { RiCloseCircleLine } from 'react-icons/ri'
import { ModalFunctionProps, SkillSchema } from '@/@types';
import { skillSchema } from '@/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage';
import { toast } from 'react-toastify';
import Form from '../Form';
import Modal from '../Modal';

const CreateSKillModal = ({ closeModal, toggleModal }: ModalFunctionProps) => {
    const [loading, setLoading] = useState(false)

    const methods = useForm<SkillSchema>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(skillSchema)
    });

    const onSubmit = async (data: SkillSchema) => {
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
                    <section className='flex md:flex-row flex-col'>
                        <Field>
                            <Input
                                name='skill_name'
                                label='Nome da habilidade'
                                placeholder='Typescript'
                            />
                            <ErrorMessage field='skill_name' />
                        </Field>

                        <Field>
                            <Input
                                name='svg_link'
                                label='Imagem'
                                placeholder='https://url.com'
                            />
                            <ErrorMessage field='svg_link' />
                        </Field>
                    </section>

                    <section className='mt-2 mb-4 flex flex-col justify-start items-start'>
                        <TextArea label='Descrição'
                            name='description'
                            placeholder='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                        />
                        <ErrorMessage field='description' />
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

export default CreateSKillModal;