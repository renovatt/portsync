import { ModalTypeProps, ProfileSchema } from '@/@types';
import { RiCloseCircleLine } from 'react-icons/ri'
import { Field } from '../Field';
import { BsSend } from 'react-icons/bs';
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

const UpdateProlileModal = ({ id, closeModal, toggleModal }: ModalTypeProps) => {
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

    const handleCloseModal = (
        event: React.MouseEvent<HTMLElement> |
            React.TouchEvent<HTMLElement>
    ) => {
        if (event.target === event.currentTarget) {
            toggleModal();
        }
    }

    return (
        <FormProvider {...methods}>
            <section
                onClick={(event) => handleCloseModal(event)}
                className='flex items-center justify-center fixed top-0 left-0 z-[50] w-screen h-screen bg-backgroundShadow backdrop-blur-sm overflow-y-auto animate-fade py-8'
            >

                <section
                    className='relative flex items-start justify-between md:max-h-[800px] md:h-[85vh] w-[90%] max-w-6xl rounded-lg p-4 flex-col bg-backgroundPrimary m-auto overflow-y-auto overflow-x-hidden-textPrimary border border-zinc-600 md:border-none'
                >
                    <RiCloseCircleLine
                        className='text-white absolute top-4 right-4 w-6 h-6 cursor-pointer hover:text-textPrimary transition-all'
                        onClick={closeModal}
                    />

                    <form
                        className='md:w-auto w-full md:m-4'
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <section className='mt-2 flex flex-col justify-start items-start'>
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
                        </section>

                        <Button
                            type='submit'
                            title='Salvar'
                            width='w-40'
                            svg={<FaRegSave className='text-white w-6 h-6' />}
                        />
                    </form>
                </section>
            </section>
        </FormProvider>
    )
}

export default UpdateProlileModal