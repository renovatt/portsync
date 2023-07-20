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
import { useGlobalContext } from '../Providers/ContextProvider';
import { postProject, postSecretkey } from '@/services';
import SecretKeyModal from '../SecretKeyModal';

const CreateProjectModal = ({ closeModal, toggleModal }: ModalFunctionProps) => {
    const methods = useForm<ProjectSchema>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(projectSchema)
    });

    const {
        secretKeyLoading,
        secretKeyModal,
        setSecretKeyLoading,
        handleOpenSecretKeyModal,
        handleCloseSecretKeyModal,
    } = useGlobalContext()

    const onSubmit = async () => {
        handleOpenSecretKeyModal()
    };

    const handleSecretKeyModalSubmit = async (secretKeyValue: string) => {
        const data = methods.getValues();
        const encryptedSecretKey = await postSecretkey(secretKeyValue)

        setSecretKeyLoading(true)

        try {
            if (typeof encryptedSecretKey === 'string') {
                const { response, error } = await postProject(data, encryptedSecretKey)

                if (response) {
                    toast.success(response);
                    closeModal();
                    handleCloseSecretKeyModal()
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    toast.error(error);
                }
            } else {
                const error = encryptedSecretKey.error;
                toast.error(error);
            }
            setSecretKeyLoading(false)
        } catch (error) {
            toast.error("Ocorreu um erro ao processar a solicitação.");
        } finally {
            setSecretKeyLoading(false)
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

            {secretKeyModal && (
                <SecretKeyModal
                    loading={secretKeyLoading}
                    closeModal={handleCloseSecretKeyModal}
                    toggleModal={handleCloseSecretKeyModal}
                    handleSecretKeyModalSubmit={handleSecretKeyModalSubmit}
                />
            )}
        </FormProvider>
    )
}

export default CreateProjectModal;