import { ModalFunctionProps, ProjectSchema } from '@/@types';
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
import { toast } from 'react-toastify';
import Form from '../Form';
import Modal from '../Modal';
import {
    GridLinksInputs,
    GridNameInputs,
    GridTextAreaInput
} from '../GridInputs';

const UpdateProjectModal = ({ id, closeModal, toggleModal }: ModalFunctionProps) => {
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

    const deleteProject = async () => {
        toast.success('Projeto deletado com sucesso!')
        closeModal()
        window.scrollTo({ top: 0, behavior: 'smooth' })
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

    return (
        <FormProvider {...methods}>
            <Modal
                closeModal={closeModal}
                toggleModal={toggleModal}
            >
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <GridNameInputs>
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
                    </GridNameInputs>

                    <GridLinksInputs>
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
                    </GridLinksInputs>

                    <Field>
                        <TechList />
                        <ErrorMessage field='techs.links' />
                    </Field>

                    <GridTextAreaInput>
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
                        onClick={deleteProject}
                        svg={<MdOutlineDeleteOutline className='text-white w-6 h-6' />}
                    />
                </aside>
            </Modal>
        </FormProvider>
    )
}

export default UpdateProjectModal