'use client'

import Aside from './Aside';
import Button from './Button';
import { FiEdit } from 'react-icons/fi';
import { LuFolderClosed } from 'react-icons/lu';
import { HiOutlineFolderAdd } from 'react-icons/hi';
import { useGlobalContext } from '@/hooks/useContext';

function Navigation() {
    const {
        profile,
        handleOpenModal,
        isMobileButtonActive,
        handleShowAndHideAside
    } = useGlobalContext();

    return (
        <nav className='flex justify-center item-center relative'>
            {profile &&
                profile.map((profile) => (
                    <Button
                        key={profile.id}
                        title='Perfil'
                        width='w-40 md:w-60'
                        svg={<FiEdit />}
                        onClick={() => handleOpenModal(profile.id!, 'profile')}
                    />
                ))}
            <Button
                title='Adicionar'
                width='w-14 md:w-60'
                textHidden='hidden md:flex'
                svg={isMobileButtonActive ? <LuFolderClosed /> : <HiOutlineFolderAdd />}
                onClick={handleShowAndHideAside}
            />
            {isMobileButtonActive && (<Aside />)}
        </nav>
    );
}

export default Navigation;
