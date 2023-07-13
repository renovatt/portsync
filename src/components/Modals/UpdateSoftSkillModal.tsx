import { ModalFunctionProps, SoftskillSchema } from '@/@types';
import Input from '../Input';
import { Field } from '../Field';
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
import { toast } from 'react-toastify';
import Form from '../Form';
import Modal from '../Modal';
import { GridNameInputs } from '../GridInputs';

const UpdateSoftSkillModal = ({ id, closeModal, toggleModal }: ModalFunctionProps) => {
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

    const deleteSoftskill = async () => {
        toast.success('Competência deletada com sucesso!')
        closeModal()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

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
                        onClick={deleteSoftskill}
                        svg={<MdOutlineDeleteOutline className='text-white w-6 h-6' />}
                    />
                </aside>
            </Modal>
        </FormProvider>
    )
}

export default UpdateSoftSkillModal