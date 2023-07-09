import { ModalTypeProps, ProjectSchema } from '@/@types';
import { RiCloseCircleLine } from 'react-icons/ri'
import { FaRegSave } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { Field } from '../Field';
import Input from '../Input';
import Button from '../Button';
import TextArea from '../TextArea';
import { useEffect, useState } from 'react';
import { getProjectsById } from '@/services';
import { projectInitialValue } from '@/hooks/useFetchData';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '@/zod';
import InputNumber from '../InputNumber';
import TechList from '../TechList';
import { ErrorMessage } from '../ErrorMessage';
import { Loader } from '../Helper/Loader';

const UpdateProjectModal = ({ id, closeModal, toggleModal }: ModalTypeProps) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [project, setProject] = useState<ProjectSchema>(projectInitialValue)

    const methods = useForm<ProjectSchema>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(projectSchema),
        defaultValues: project
    });

    const onSubmit = async (data: ProjectSchema) => {
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

    const deleteProject = async () => {
        console.log('deletado')
    }

    const fetchModal = async () => {
        setLoading(true)
        try {
            const project = await getProjectsById(id!)

            if ('project' in project) {
                setProject(project.project)
                methods.reset(project.project)
            } else if ('error' in project) {
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
                className='flex items-center justify-center fixed top-0 left-0 z-[50] w-screen h-screen  bg-backgroundShadow backdrop-blur-sm overflow-y-auto animate-fade'
            >
                {/* {id && !loading && ( */}
                    <section
                        className='relative flex items-start justify-between h-auto md:max-h-[800px] max-h-[initial] md:h-[85vh] w-[80%] max-w-6xl rounded-lg p-4 flex-col bg-backgroundPrimary md:mt-0 mt-[20rem] md:mb-0 mb-10 overflow-y-auto overflow-x-hidden'
                    >
                        <RiCloseCircleLine
                            className='text-white absolute top-4 right-4 w-6 h-6 cursor-pointer hover:text-textPrimary transition-all'
                            onClick={closeModal}
                        />

                        <form
                            className='w-full m-4'
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <section className='flex'>
                                <Controller
                                    name='project_name'
                                    control={methods.control}
                                    defaultValue={project.project_name}
                                    render={({ field }) => (
                                        <Field>
                                            <Input
                                                label='Nome do projeto'
                                                placeholder='CutePet'
                                                {...field}
                                            />
                                            <ErrorMessage field='project_name' />
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name='order'
                                    control={methods.control}
                                    defaultValue={project.order}
                                    render={({ field }) => (
                                        <Field>
                                            <InputNumber
                                                label='Posição n°'
                                                placeholder='2'
                                                width='w-20'
                                                {...field}
                                            />
                                            <ErrorMessage field='order' />
                                        </Field>
                                    )}
                                />
                            </section>


                            <section className='flex'>
                                <Controller
                                    name='banner_url'
                                    control={methods.control}
                                    defaultValue={project.banner_url}
                                    render={({ field }) => (
                                        <Field>
                                            <Input
                                                label='Banner'
                                                placeholder='https://url.com'
                                                {...field}
                                            />
                                            <ErrorMessage field='banner_url' />
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name='thumbnail_url'
                                    control={methods.control}
                                    defaultValue={project.thumbnail_url}
                                    render={({ field }) => (
                                        <Field>
                                            <Input
                                                label='Thumbnail'
                                                placeholder='https://url.com'
                                                {...field}
                                            />
                                            <ErrorMessage field='thumbnail_url' />
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name='deploy_url'
                                    control={methods.control}
                                    defaultValue={project.deploy_url}
                                    render={({ field }) => (
                                        <Field>
                                            <Input
                                                label='Deploy'
                                                placeholder='https://url.com'
                                                {...field}
                                            />
                                            <ErrorMessage field='deploy_url' />
                                        </Field>
                                    )}
                                />
                            </section>

                            <Field>
                                <TechList />
                                <ErrorMessage field='techs.links' />
                            </Field>

                            <section className='mt-2 flex flex-col justify-start items-start'>
                                <Controller
                                    name='description'
                                    control={methods.control}
                                    defaultValue={project.description}
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

                        <aside className='flex flex-col justify-center items-end w-full '>
                            <Button
                                title='Apagar'
                                width='w-40'
                                onClick={deleteProject}
                                svg={<MdOutlineDeleteOutline className='text-white w-6 h-6' />}
                            />
                        </aside>
                    </section>
                {/* )} */}
            </section>
        </FormProvider>
    )
}

export default UpdateProjectModal