import { ModalTypeProps, ProjectsTypeProps } from '@/@types';
import { RiCloseCircleLine } from 'react-icons/ri'
import { FaRegSave } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { Field } from '../Field';
import Input from '../Input';
import Button from '../Button';
import TextArea from '../TextArea';
import { useEffect, useState } from 'react';
import { getProjectsById } from '@/services';
import { initialValue } from '@/hooks/useFetchData';

const UpdateProjectModal = ({ id, closeModal, toggleModal }: ModalTypeProps) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [project, setProject] = useState<ProjectsTypeProps>(initialValue)

    const fetchModal = async () => {
        setLoading(true)
        try {
            const project = await getProjectsById(id)

            if ('project' in project) {
                setProject(project.project)
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
        <section
            onClick={(event) => handleCloseModal(event)}
            className='flex items-center justify-center fixed top-0 left-0 z-[50] w-screen h-screen  bg-backgroundShadow backdrop-blur-sm overflow-y-auto animate-fade'
        >
            <section
                className='relative flex items-start justify-between h-auto md:max-h-[800px] max-h-[initial] md:h-[85vh] w-[80%] max-w-6xl rounded-lg p-4 flex-col  bg-backgroundPrimary md:mt-0 mt-[20rem] md:mb-0 mb-10 overflow-y-auto overflow-x-hidden'
            >
                <RiCloseCircleLine
                    className='text-white absolute top-4 right-4 w-6 h-6 cursor-pointer hover:text-textPrimary transition-all'
                    onClick={closeModal}
                />

                <p className='text-white'>nome: {project.project_name}</p>
                <form className='w-full m-4'>
                    <section className='flex'>
                        <Field>
                            <Input
                                name={project.project_name}
                                label='Nome do projeto'
                                placeholder='CutePet'
                            />
                        </Field>

                        <Field>
                            <Input
                                label='Posição n°'
                                placeholder='2'
                                width='w-20'
                            />
                        </Field>
                    </section>


                    <section className='flex'>
                        <Field>
                            <Input
                                label='Banner'
                                placeholder='https://url.com'
                            />
                        </Field>

                        <Field>
                            <Input
                                label='Thumbnail'
                                placeholder='https://url.com'
                            />
                        </Field>

                        <Field>
                            <Input
                                label='Deploy'
                                placeholder='https://url.com'
                            />
                        </Field>
                    </section>

                    <section className='flex flex-col justify-center items-start'>
                        <h1 className='text-zinc-600 text-sm font-bold'>Tecnologia</h1>
                        <button type='button' className='mt-1 mb-8 ml-2 text-textPrimary text-xs flex items-center gap-1'>Adicionar</button>
                    </section>

                    <section className='flex'>
                        <Field>
                            <Input
                                label='Tecnologia'
                                placeholder='Typescript'
                            />
                        </Field>

                        <Field>
                            <Input
                                label='Imagem'
                                placeholder='https://url.com'
                            />
                        </Field>

                        <Field>
                            <Input
                                label='Link'
                                placeholder='https://url.com'
                            />
                        </Field>
                    </section>

                    <section className='flex'>
                        <Field>
                            <Input
                                label='Tecnologia'
                                placeholder='Next.js'
                            />
                        </Field>

                        <Field>
                            <Input
                                label='Imagem'
                                placeholder='https://url.com'
                            />
                        </Field>

                        <Field>
                            <Input
                                label='Link'
                                placeholder='https://url.com'
                            />
                        </Field>
                    </section>

                    <section className='flex'>
                        <Field>
                            <Input
                                label='Tecnologia'
                                placeholder='Node.js'
                            />
                        </Field>

                        <Field>
                            <Input
                                label='Imagem'
                                placeholder='https://url.com'
                            />
                        </Field>

                        <Field>
                            <Input
                                label='Link'
                                placeholder='https://url.com'
                            />
                        </Field>
                    </section>

                    <section className='mt-2'>
                        <TextArea label='Descrição'
                            name='description'
                            placeholder={project.description}
                        />
                    </section>
                </form>

                <aside className='flex flex-col justify-center items-end w-full '>
                    <Button
                        title='Apagar'
                        width='w-40'
                        svg={<MdOutlineDeleteOutline className='text-white w-6 h-6' />}
                    />

                    <Button
                        title='Salvar'
                        width='w-40'
                        svg={<FaRegSave className='text-white w-6 h-6' />}
                    />
                </aside>
            </section>
        </section>
    )
}

export default UpdateProjectModal