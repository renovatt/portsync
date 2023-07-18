import { ModalFunctionProps, SkillSchema } from '@/@types';
import Input from '../Input';
import { Field } from '../Field';
import TextArea from '../TextArea';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { skillSchema } from '@/zod';
import { ErrorMessage } from '../ErrorMessage';
import { getSkillById, postSecretkey } from '@/services';
import useAPI, { skillInitialValue } from '@/hooks/useAPI';
import Button from '../Button';
import { FaRegSave } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import Form from '../Form';
import Modal from '../Modal';
import { GridLinksInputs, GridTextAreaInput } from '../GridInputs';
import { useGlobalContext } from '../Providers/ContextProvider';
import SecretKeyModal from '../SecretKeyModal';

const UpdateSkillModal = ({ id, closeModal, toggleModal }: ModalFunctionProps) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [skill, setSkill] = useState<SkillSchema>(skillInitialValue)

    const methods = useForm<SkillSchema>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(skillSchema),
        defaultValues: skill
    });

    const {
        response,
        error: errorAPI,
        putSkillData,
        deleteSoftskillData
    } = useAPI();

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

    const deleteSkill = async () => {
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
            await putSkillData(id!, data, encryptedSecretKey);

            if (response) {
                toast.success(response);
                closeModal();
                handleCloseSecretKeyModal()
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                toast.error(errorAPI);
            }
        } else {
            const error = encryptedSecretKey.error;
            toast.error(error);
        }
    }

    const handleDeleteSubmit = async (secretKeyValue: string) => {
        const encryptedSecretKey = await postSecretkey(secretKeyValue);

        if (typeof encryptedSecretKey === 'string') {
            await deleteSoftskillData(id!, encryptedSecretKey);

            if (response) {
                toast.success(response);
                closeModal();
                handleCloseSecretKeyModal();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                toast.error(errorAPI);
            }
        } else {
            const error = encryptedSecretKey.error;
            toast.error(error);
        }
    };

    const fetchModal = async () => {
        setLoading(true)
        try {
            const skill = await getSkillById(id!)

            if ('skill' in skill) {
                setSkill(skill.skill)
                methods.reset(skill.skill)
            } else if ('error' in skill) {
                setError(true)
            }
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchModal()
    }, [id])

    return (
        <FormProvider {...methods}>
            <Modal
                closeModal={closeModal}
                toggleModal={toggleModal}
            >
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <GridLinksInputs>
                        <Controller
                            name='skill_name'
                            control={methods.control}
                            defaultValue={skill?.skill_name}
                            render={({ field }) => (
                                <Field>
                                    <Input
                                        label='Nome da habilidade'
                                        placeholder='Typescript'
                                        {...field}
                                    />
                                    <ErrorMessage field='skill_name' />
                                </Field>
                            )}
                        />

                        <Controller
                            name='svg_link'
                            control={methods.control}
                            defaultValue={skill?.svg_link}
                            render={({ field }) => (
                                <Field>
                                    <Input
                                        label='Imagem'
                                        placeholder='https://url.com'
                                        {...field}
                                    />
                                    <ErrorMessage field='svg_link' />
                                </Field>
                            )}
                        />
                    </GridLinksInputs>

                    <GridTextAreaInput>
                        <Controller
                            name='description'
                            control={methods.control}
                            defaultValue={skill?.description}
                            render={({ field }) => (
                                <Field>
                                    <TextArea
                                        label='Descrição'
                                        placeholder='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                                        {...field}
                                    />
                                    <ErrorMessage field='description' />
                                </Field>
                            )}
                        />
                    </GridTextAreaInput>

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
                        onClick={deleteSkill}
                        svg={<MdOutlineDeleteOutline className='text-white w-6 h-6' />}
                    />
                </aside>
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

export default UpdateSkillModal