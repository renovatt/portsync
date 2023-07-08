import { ModalTypeProps, ProfileProps } from '@/@types';
import { RiCloseCircleLine } from 'react-icons/ri'
import TextArea from '../TextArea';
import Button from '../Button';
import { FaRegSave } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getProfileById } from '@/services';

const UpdateProlileModal = ({ id, closeModal, toggleModal }: ModalTypeProps) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState<ProfileProps>()

    const fetchModal = async () => {
        setLoading(true)
        try {
            const profile = await getProfileById(id)

            if ('profile' in profile) {
                setProfile(profile.profile)
            } else if ('error' in profile) {
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

                <form className='w-full m-4'>
                    <section className='flex-col mt-4'>
                        <TextArea label='Descrição 1'
                            name='description'
                            rows={6}
                            placeholder={profile?.description_1!}
                        />

                        <TextArea label='Descrição 2'
                            name='description'
                            rows={6}
                            placeholder={profile?.description_2!}
                        />
                    </section>
                </form>

                <aside className='flex flex-col justify-center items-end w-full '>
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

export default UpdateProlileModal