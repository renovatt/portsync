import { useState } from 'react';
import Input from '../Input';
import TextArea from '../TextArea';
import Button from '../Button';
import { Field } from '../Field';
import { BsSend } from 'react-icons/bs';
import { ModalFunctionProps, SkillSchema } from '@/@types';
import { skillSchema } from '@/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage';
import { toast } from 'react-toastify';
import Form from '../Form';
import Modal from '../Modal';
import {
    GridLinksInputs,
    GridTextAreaInput
} from '../GridInputs';
import { useGlobalContext } from '../Providers/ContextProvider';
import { postSecretkey, postSkill } from '@/services';
import SecretKeyModal from '../SecretKeyModal';

const CreateSKillModal = ({ closeModal, toggleModal }: ModalFunctionProps) => {
    const [loading, setLoading] = useState(false)

    const methods = useForm<SkillSchema>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(skillSchema)
    });

    const {
        secretKeyModal,
        handleOpenSecretKeyModal,
        handleCloseSecretKeyModal
    } = useGlobalContext()

    const onSubmit = async () => {
        handleOpenSecretKeyModal()
    };

    const handleSecretKeyModalSubmit = async (secretKeyValue: string) => {
        const data = methods.getValues();
        const encryptedSecretKey = await postSecretkey(secretKeyValue)

        if (typeof encryptedSecretKey === 'string') {
            const { response, error } = await postSkill(data, encryptedSecretKey);

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
    };

    return (
        <FormProvider {...methods}>
            <Modal
                closeModal={closeModal}
                toggleModal={toggleModal}
            >
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <GridLinksInputs>
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
                    </GridLinksInputs>

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
                    closeModal={handleCloseSecretKeyModal}
                    toggleModal={handleCloseSecretKeyModal}
                    handleSecretKeyModalSubmit={handleSecretKeyModalSubmit}
                />
            )}
        </FormProvider>
    )
}

export default CreateSKillModal;