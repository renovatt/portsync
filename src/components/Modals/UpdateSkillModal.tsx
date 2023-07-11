import { ModalTypeProps, SkillSchema } from '@/@types';
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

const UpdateSkillModal = ({ id, closeModal, toggleModal }: ModalTypeProps) => {
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
            setData(data)
            console.log(data)
            console.log('Salvo com sucesso.')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async () => {
        console.log('deletado')
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

export default UpdateSkillModal