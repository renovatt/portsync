import { ModalTypeProps, SoftskillSchema } from '@/@types';
import { RiCloseCircleLine } from 'react-icons/ri'
import Input from '../Input';
import { Field } from '../Field';
import { BsSend } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { softskillSchema } from '@/zod';
import { ErrorMessage } from '../ErrorMessage';
import { getSoftskillById } from '@/services';
import { softskillInitialValue } from '@/hooks/useFetchData';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import Button from '../Button';
import { FaRegSave } from 'react-icons/fa';

const UpdateSoftSkillModal = ({ id, closeModal, toggleModal }: ModalTypeProps) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [softskill, setSoftskill] = useState<SoftskillSchema>(softskillInitialValue)

    const methods = useForm<SoftskillSchema>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(softskillSchema),
        defaultValues: softskill
    });

    const onSubmit = async (data: SoftskillSchema) => {
        setLoading(true);
        try {
            console.log(data)
            console.log('Salvo com sucesso.')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const fetchModal = async () => {
        setLoading(true)
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
        } finally {
            setLoading(false)
        }
    }

    const deleteProject = async () => {
        console.log('deletado')
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
                        <section className='flex'>
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
                        </section>

                        <Button
                            type='submit'
                            title='Salvar'
                            width='w-40'
                            svg={<FaRegSave className='text-white w-6 h-6' />}
                        />
                    </form>

                    <aside className='flex flex-col justify-center items-start md:items-end w-full'>
                        <Button
                            title='Apagar'
                            width='w-40'
                            onClick={deleteProject}
                            svg={<MdOutlineDeleteOutline className='text-white w-6 h-6' />}
                        />
                    </aside>
                </section>
            </section>
        </FormProvider>
    )
}

export default UpdateSoftSkillModal