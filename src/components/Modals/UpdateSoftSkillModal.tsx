import { ModalTypeProps, SoftskillsTypeProps } from '@/@types';
import { RiCloseCircleLine } from 'react-icons/ri'
import Input from '../Input';
import { Field } from '../Field';
import Button from '../Button';
import { FaRegSave } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { getSoftskillById } from '@/services';

const UpdateSoftSkillModal = ({ id, closeModal, toggleModal }: ModalTypeProps) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [softskill, setSoftskill] = useState<SoftskillsTypeProps>()

    const fetchModal = async () => {
        setLoading(true)
        try {
            const softskill = await getSoftskillById(id)

            if ('softskill' in softskill) {
                setSoftskill(softskill.softskill)
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
                className='relative flex items-start justify-between h-auto md:max-h-[800px] max-h-[initial] md:h-[85vh] w-[80%] max-w-6xl rounded-lg p-4 flex-col bg-backgroundPrimary md:mt-0 mt-[20rem] md:mb-0 mb-10'
            >
                <RiCloseCircleLine
                    className='text-white absolute top-4 right-4 w-6 h-6 cursor-pointer hover:text-textPrimary transition-all'
                    onClick={closeModal}
                />

                <p className='text-white'>nome:{softskill?.softskill_name}</p>

                <form className='w-full m-4'>
                    <section className='flex'>
                        <Field>
                            <Input
                                label='Nome da Softskill'
                                placeholder={softskill?.softskill_name!}
                            />
                        </Field>
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

export default UpdateSoftSkillModal