import { ModalFunctionProps, SkillSchema } from '@/@types';
import { RiCloseCircleLine } from 'react-icons/ri'
import Input from '../Input';
import { Field } from '../Field';
import TextArea from '../TextArea';
import { BsSend } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { skillSchema } from '@/zod';
import { ErrorMessage } from '../ErrorMessage';
import { getSkillById } from '@/services';
import { skillInitialValue } from '@/hooks/useFetchData';
import Button from '../Button';
import { FaRegSave } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import Form from '../Form';
import Modal from '../Modal';

const UpdateSkillModal = ({ id, closeModal, toggleModal }: ModalFunctionProps) => {
    const [error, setError] = useState(false)
    const [data, setData] = useState<SkillSchema>()
    const [loading, setLoading] = useState(false)
    const [skill, setSkill] = useState<SkillSchema>(skillInitialValue)

    const methods = useForm<SkillSchema>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(skillSchema),
        defaultValues: skill
    });

    const onSubmit = async (data: SkillSchema) => {
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

    const deleteSkill = async () => {
        toast.success('Habilidade deletada com sucesso!')
        closeModal()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

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
                    <section className='flex md:flex-row flex-col'>
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
                    </section>

                    <section className='mt-2 flex flex-col justify-start items-start'>
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
                    </section>

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
        </FormProvider>
    )
}

export default UpdateSkillModal