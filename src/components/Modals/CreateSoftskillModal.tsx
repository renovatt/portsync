import Input from '../Input';
import { ModalFunctionProps, SoftskillSchema } from '@/@types';
import { Field } from '../Field';
import { BsSend } from 'react-icons/bs';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { softskillSchema } from '@/zod';
import { ErrorMessage } from '../ErrorMessage';
import Button from '../Button';
import { toast } from 'react-toastify';
import Form from '../Form';
import Modal from '../Modal';
import { GridNameInputs } from '../GridInputs';
import { useGlobalContext } from '@/components/Providers/ContextProvider';
import { postSecretkey } from '@/services';
import useAPI from '@/hooks/useAPI';
import SecretKeyModal from '../SecretKeyModal';

const CreateSoftskillModal = ({ closeModal, toggleModal }: ModalFunctionProps) => {
    const methods = useForm<SoftskillSchema>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(softskillSchema),
    });

    const {
        response,
        error,
        postSoftskillData
    } = useAPI();

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
            await postSoftskillData(data, encryptedSecretKey);

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
                    closeModal={handleCloseSecretKeyModal}
                    toggleModal={handleCloseSecretKeyModal}
                    handleSecretKeyModalSubmit={handleSecretKeyModalSubmit}
                />
            )}
        </FormProvider>
    );
};

export default CreateSoftskillModal;
