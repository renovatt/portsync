import { useState } from 'react';
import { projectSchema } from '@/zod';
import { ModalFunctionProps, ProjectSchema } from '@/@types';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { BsSend } from 'react-icons/bs';
import { Field } from '../Field';
import { ErrorMessage } from '../ErrorMessage';
import Input from '../Input';
import Button from '../Button';
import InputNumber from '../InputNumber';
import TextArea from '../TextArea';
import TechList from '../TechList';
import { toast } from 'react-toastify';
import Form from '../Form';
import Modal from '../Modal';
import {
    GridLinksInputs,
    GridNameInputs,
    GridTextAreaInput
} from '../GridInputs';

const CreateProjectModal = ({ closeModal, toggleModal }: ModalFunctionProps) => {
    const [loading, setLoading] = useState(false)

    const methods = useForm<ProjectSchema>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(projectSchema)
    });

    const onSubmit = async (data: ProjectSchema) => {
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
                    <GridNameInputs>
                        <Field>
                            <Input
                                name='project_name'
                                label='Nome do projeto'
                                placeholder='CutePet'
                            />
                            <ErrorMessage field='project_name' />
                        </Field>

                        <Field>
                            <InputNumber
                                name='order'
                                label='Posição n°'
                                placeholder='2'
                                width='w-20'
                            />
                            <ErrorMessage field='order' />
                        </Field>
                    </GridNameInputs>

                    <GridLinksInputs>
                        <Field>
                            <Input
                                name='banner_url'
                                label='Banner'
                                placeholder='https://url.com'
                            />
                            <ErrorMessage field='banner_url' />
                        </Field>

                        <Field>
                            <Input
                                name='thumbnail_url'
                                label='Thumbnail'
                                placeholder='https://url.com'
                            />
                            <ErrorMessage field='thumbnail_url' />
                        </Field>

                        <Field>
                            <Input
                                name='deploy_url'
                                label='Deploy'
                                placeholder='https://url.com'
                            />
                            <ErrorMessage field='deploy_url' />
                        </Field>
                    </GridLinksInputs>

                    <Field>
                        <TechList />
                        <ErrorMessage field='techs.links' />
                    </Field>

                    <GridTextAreaInput>
                        <TextArea label='Descrição'
                            name='description'
                            placeholder='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                        />
                        <ErrorMessage field='description' />
                    </GridTextAreaInput>

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

export default CreateProjectModal;