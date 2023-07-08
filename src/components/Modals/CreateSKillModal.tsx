import { ModalTypeProps } from '@/@types';
import { RiCloseCircleLine } from 'react-icons/ri'
import Input from '../Input';
import { Field } from '../Field';
import TextArea from '../TextArea';
import Button from '../Button';
import { BsSend } from 'react-icons/bs';

const UpdateSKillModal = ({ closeModal, toggleModal }: ModalTypeProps) => {

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
                                label='Nome da habilidade'
                                placeholder='Typescript'
                            />
                        </Field>

                        <Field>
                            <Input
                                label='Imagem'
                                placeholder='https://url.com'
                            />
                        </Field>
                    </section>

                    <section className='mt-4'>
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

export default UpdateSKillModal