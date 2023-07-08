import { ModalTypeProps } from '@/@types';
import { RiCloseCircleLine } from 'react-icons/ri'
import { BsSend } from 'react-icons/bs';
import { Field } from '../Field';
import Input from '../Input';
import Button from '../Button';
import TextArea from '../TextArea';

const CreateProjectModal = ({ id, closeModal, toggleModal }: ModalTypeProps) => {
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
                className='relative flex items-start justify-between h-auto md:max-h-[800px] max-h-[initial] md:h-[85vh] w-[80%] max-w-6xl rounded-lg p-4 flex-col md:flex-row bg-backgroundPrimary md:mt-0 mt-[20rem] md:mb-0 mb-10 overflow-y-auto'
            >
                <RiCloseCircleLine
                    className='text-white absolute top-4 right-4 w-6 h-6 cursor-pointer hover:text-textPrimary transition-all'
                    onClick={closeModal}
                />

                <form className='w-full m-4'>
                    <section className='flex'>
                        <Field>
                            <Input
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
                        <button type='button' className='mt-1 ml-2 text-textPrimary text-xs flex items-center gap-1'>Adicionar</button>
                    </section>

                    <section className='mt-20'>
                        <TextArea label='Descrição'
                            name='description'
                            placeholder='Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quas accusantium et inventore tenetur quo officia, iusto nobis id quae, esse asperiores porro, animi dolorem ab? Obcaecati eos suscipit minus!'
                            width=''
                        />
                    </section>
                </form>

                <aside className='flex justify-end items-center w-full '>
                    <Button
                        title='Enviar'
                        width='w-40'
                        svg={<BsSend className='text-white w-6 h-6' />}
                    />
                </aside>
            </section>
        </section>
    )
}

export default CreateProjectModal