import Input from '../Input';
import { ModalFunctionProps, SoftskillSchema } from '@/@types';
import { Field } from '../Field';
import { BsSend } from 'react-icons/bs';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { softskillSchema } from '@/zod';
import { ErrorMessage } from '../ErrorMessage';
import Button from '../Button';
import Form from '../Form';
import Modal from '../Modal';
import { toast } from 'react-toastify';
import { GridNameInputs } from '../GridInputs';
import { useGlobalContext } from '@/components/Providers/ContextProvider';
import { postSecretkey, postSoftskill } from '@/services';
import SecretKeyModal from './SecretKeyModal';

const CreateSoftskillModal = ({ closeModal, toggleModal }: ModalFunctionProps) => {
    const methods = useForm<SoftskillSchema>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(softskillSchema),
    });

    const {
        secretKeyLoading,
        secretKeyModal,
        setSecretKeyLoading,
        handleOpenSecretKeyModal,
        handleCloseSecretKeyModal,
        handleUpdateSoftskills
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
                const { response, error } = await postSoftskill(data, encryptedSecretKey)

                if (response) {
                    toast.success(response);
                    closeModal();
                    handleCloseSecretKeyModal();
                    handleUpdateSoftskills();
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
            <Modal closeModal={closeModal} toggleModal={toggleModal}>
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <GridNameInputs>
                        <Field>
                            <Input
                                name='softskill_name'
                                label='Nome da competência'
                                placeholder='Resiliência'
                            />
                            <ErrorMessage field='softskill_name' />
                        </Field>
                    </GridNameInputs>

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
    );
};

export default CreateSoftskillModal;
