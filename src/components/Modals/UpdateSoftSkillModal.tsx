import { ModalFunctionProps, SoftskillSchema } from '@/@types';
import Input from '../Input';
import { Field } from '../Field';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { softskillSchema } from '@/zod';
import { ErrorMessage } from '../ErrorMessage';
import { deleteSoftskill, getSoftskillById, postSecretkey, putSoftskill } from '@/services';
import { softskillInitialValue } from '@/hooks/useAPI';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import Button from '../Button';
import { FaRegSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Form from '../Form';
import Modal from '../Modal';
import { GridNameInputs } from '../GridInputs';
import { useGlobalContext } from '../Providers/ContextProvider';
import SecretKeyModal from '../SecretKeyModal';
import Error from '../Helper/Error';

const UpdateSoftSkillModal = ({ id, closeModal, toggleModal }: ModalFunctionProps) => {
    const [error, setError] = useState(false)
    const [softskill, setSoftskill] = useState<SoftskillSchema>(softskillInitialValue)

    const methods = useForm<SoftskillSchema>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(softskillSchema),
        defaultValues: softskill
    });

    const {
        deleteButton,
        secretKeyModal,
        handleOpenSecretKeyModal,
        handleCloseSecretKeyModal,
        handleDeleteButton
    } = useGlobalContext()

    const onSubmit = async () => {
        handleOpenSecretKeyModal()
    };

    const handleDeleteSoftskill = async () => {
        handleDeleteButton()
        handleOpenSecretKeyModal();
    }

    const handleSecretKeyModalSubmit = async (secretKeyValue: string) => {
        if (!deleteButton) {
            handlePutSubmit(secretKeyValue)
        } else {
            handleDeleteSubmit(secretKeyValue)
        }
    };

    const handlePutSubmit = async (secretKeyValue: string) => {
        const data = methods.getValues();
        const encryptedSecretKey = await postSecretkey(secretKeyValue)

        if (typeof encryptedSecretKey === 'string') {
            const { response, error } = await putSoftskill(id!, data, encryptedSecretKey);

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
    }

    const handleDeleteSubmit = async (secretKeyValue: string) => {
        const encryptedSecretKey = await postSecretkey(secretKeyValue);

        if (typeof encryptedSecretKey === 'string') {
            const { response, error } = await deleteSoftskill(id!, encryptedSecretKey);

            if (response) {
                toast.success(response);
                closeModal();
                handleCloseSecretKeyModal();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                toast.error(error);
            }
        } else {
            const error = encryptedSecretKey.error;
            toast.error(error);
        }
    };

    const fetchModal = async () => {
        try {
            const softskill = await getSoftskillById(id!)

            if ('softskill' in softskill) {
                setSoftskill(softskill.softskill)
                methods.reset(softskill.softskill)
            } else if ('error' in softskill) {
                setError(true)
            }

        } catch {
            setError(true)
        }
    }

    useEffect(() => {
        fetchModal()
    }, [id])

    if (error) {
        return (
            <Modal
                closeModal={closeModal}
                toggleModal={toggleModal}
            >
                <Error />
            </Modal>
        )
    }

    return (
        <FormProvider {...methods}>
            <Modal
                closeModal={closeModal}
                toggleModal={toggleModal}
            >
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <GridNameInputs>
                        <Controller
                            name='softskill_name'
                            control={methods.control}
                            defaultValue={softskill?.softskill_name}
                            render={({ field }) => (
                                <Field>
                                    <Input
                                        label='Nome da Competênica'
                                        placeholder='Resiliênica'
                                        {...field}
                                    />
                                    <ErrorMessage field='softskill_name' />
                                </Field>
                            )}
                        />
                    </GridNameInputs>

                    <Button
                        type='submit'
                        title='Salvar'
                        width='w-40'
                        svg={<FaRegSave className='text-white w-6 h-6' />}
                    />
                </Form>

                <aside className='flex flex-col justify-center items-start md:items-end w-full'>
                    <Button
                        title='Apagar'
                        width='w-40'
                        onClick={handleDeleteSoftskill}
                        svg={<MdOutlineDeleteOutline className='text-white w-6 h-6' />}
                    />
                </aside>
            </Modal>

            {
                secretKeyModal && (
                    <SecretKeyModal
                        closeModal={handleCloseSecretKeyModal}
                        toggleModal={handleCloseSecretKeyModal}
                        handleSecretKeyModalSubmit={handleSecretKeyModalSubmit}
                    />
                )
            }
        </FormProvider >
    )
}

export default UpdateSoftSkillModal