'use client'

import Link from 'next/link'
import Button from './Button'
import { FiEdit } from 'react-icons/fi'
import { BiAddToQueue } from 'react-icons/bi'
import UpdateProjectModal from './Modals/UpdateProjectModal'
import { useToggle } from '@/hooks/useToggle'
import UpdateSkillModal from './Modals/UpdateSkillModal'
import UpdateProlileModal from './Modals/UpdateProlileModal'
import UpdateSoftSkillModal from './Modals/UpdateSoftSkillModal'
import { useState } from 'react'
import useFetchData from '@/hooks/useFetchData'

const Dashboard = () => {

    const [profileId, setProfileId] = useState('')
    const [projectId, setProjectId] = useState('')
    const [skillId, setSkillId] = useState('')
    const [softskillId, setSoftskillId] = useState('')

    const {
        modal,
        openModal,
        closeModal,
        toggleModal } = useToggle();

    const {
        profile,
        projects,
        skillsResponse,
        softSkillsResponse } = useFetchData();

    const handleOpenProfileModal = (id: string) => {
        openModal()
        setProfileId(id)
        setSkillId('')
        setProjectId('')
        setSoftskillId('')
    }

    const handleOpenProjectModal = (id: string) => {
        openModal()
        setProjectId(id)
        setSkillId('')
        setSoftskillId('')
        setProfileId('')
    }
    const handleOpenSkillModal = (id: string) => {
        openModal()
        setSkillId(id)
        setProjectId('')
        setSoftskillId('')
        setProfileId('')
    }

    const handleOpenSoftskillModal = (id: string) => {
        openModal()
        setSoftskillId(id)
        setSkillId('')
        setProjectId('')
        setProfileId('')
    }

    return (
        <>
            {modal && profileId && (
                <UpdateProlileModal
                    id={profileId}
                    closeModal={closeModal}
                    toggleModal={toggleModal}
                />
            )}

            {modal && projectId && (
                <UpdateProjectModal
                    id={projectId}
                    closeModal={closeModal}
                    toggleModal={toggleModal}
                />
            )}

            {modal && skillId && (
                <UpdateSkillModal
                    id={skillId}
                    closeModal={closeModal}
                    toggleModal={toggleModal}
                />
            )}

            {modal && softskillId && (
                <UpdateSoftSkillModal
                    id={softskillId}
                    closeModal={closeModal}
                    toggleModal={toggleModal}
                />
            )}

            <section className='flex flex-col justify-between items-center w-screen h-screen p-2 bg-backgroundPrimary'>
                <header className='flex justify-between items-center w-full p-2 h-20'>
                    <Link
                        href='/'
                        className='text-white text-2xl font-bold'
                    >
                        Port<span className='text-textPrimary'>Sync</span></Link>

                    <nav className='flex justify-center item-center'>
                        {profile && profile.map(profile => (
                            <Button
                                key={profile.id}
                                title='Perfil'
                                width='w-60'
                                svg={<FiEdit />}
                                onClick={() => handleOpenProfileModal(profile.id)}
                            />
                        ))}

                        <Button
                            title='Adicionar'
                            width='w-60'
                            svg={<BiAddToQueue />}
                        />
                    </nav>
                </header>

                <article className='flex md:flex-row flex-col justify-center items-center w-full'>
                    <section className='flex justify-start items-center flex-col max-h-80 overflow-y-scroll'>
                        {projects && projects
                            .sort((a, b) => a.order - b.order)
                            .map(project => (
                                <Button
                                    key={project.id}
                                    title={project.project_name}
                                    svg={<FiEdit className='text-white w-6 h-6' />}
                                    onClick={() => handleOpenProjectModal(project.id)}
                                />
                            ))}
                    </section>

                    <section className='flex justify-start items-center flex-col max-h-80 overflow-y-scroll'>
                        {skillsResponse && skillsResponse.map(skill => (
                            <Button
                                key={skill.id}
                                title={skill.skill_name}
                                svg={<FiEdit className='text-white w-6 h-6' />}
                                onClick={() => handleOpenSkillModal(skill.id)}
                            />
                        ))}
                    </section>

                    <section className='flex justify-start items-center flex-col max-h-80 overflow-y-scroll'>
                        {softSkillsResponse && softSkillsResponse.map(softskill => (
                            <Button
                                key={softskill.id}
                                title={softskill.softskill_name}
                                svg={<FiEdit className='text-white w-6 h-6' />}
                                onClick={() => handleOpenSoftskillModal(softskill.id)}
                            />
                        ))}
                    </section>
                </article>
            </section>
        </>
    )
}

export default Dashboard;