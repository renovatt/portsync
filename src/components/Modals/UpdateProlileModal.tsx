import { ModalFunctionProps, ProfileSchema } from '@/@types';
import { Field } from '../Field';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { profileSchema } from '@/zod';
import { ErrorMessage } from '../ErrorMessage';
import { getProfileById } from '@/services';
import TextArea from '../TextArea';
import { profileInitialValue } from '@/hooks/useFetchData';
import Button from '../Button';
import { FaRegSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Form from '../Form';
import Modal from '../Modal';
import { GridTextAreaInput } from '../GridInputs';

const UpdateProlileModal = ({ id, closeModal, toggleModal }: ModalFunctionProps) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState<ProfileSchema>(profileInitialValue)

    const methods = useForm<ProfileSchema>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(profileSchema),
        defaultValues: profile
    });

    const onSubmit = async (data: ProfileSchema) => {
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

    const fetchModal = async () => {
        setLoading(true)
        try {
            const profile = await getProfileById(id!)

            if ('profile' in profile) {
                setProfile(profile.profile)
                methods.reset(profile.profile)
            } else if ('error' in profile) {
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
                    <GridTextAreaInput>
                        <Controller
                            name='description_1'
                            control={methods.control}
                            defaultValue={profile?.description_1}
                            render={({ field }) => (
                                <Field>
                                    <TextArea
                                        rows={6}
                                        label='Descrição 1'
                                        placeholder='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                                        {...field}
                                    />
                                    <ErrorMessage field='description_1' />
                                </Field>
                            )}
                        />

                        <Controller
                            name='description_2'
                            control={methods.control}
                            defaultValue={profile?.description_2}
                            render={({ field }) => (
                                <Field>
                                    <TextArea
                                        rows={6}
                                        label='Descrição 2'
                                        placeholder='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                                        {...field}
                                    />
                                    <ErrorMessage field='description_2' />
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
            </Modal>
        </FormProvider>
    )
}

export default UpdateProlileModal