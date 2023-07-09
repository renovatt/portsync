'use client'

import Link from 'next/link'
import Button from './Button'
import { useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { HiOutlineFolderAdd } from 'react-icons/hi'
import { BiAddToQueue } from 'react-icons/bi'
import { useToggle } from '@/hooks/useToggle'
import { Loader } from './Helper/Loader'
import useFetchData from '@/hooks/useFetchData'
import UpdateProjectModal from './Modals/UpdateProjectModal'
import UpdateSkillModal from './Modals/UpdateSkillModal'
import UpdateProlileModal from './Modals/UpdateProlileModal'
import UpdateSoftSkillModal from './Modals/UpdateSoftSkillModal'
import CreateProjectModal from './Modals/CreateProjectModal'
import CreateSKillModal from './Modals/CreateSKillModal'
import CreateSoftskillModal from './Modals/CreateSoftskillModal'
import { CreateModalType, UpdateModalType } from '@/@types'

const Dashboard = () => {
    const [aside, setAside] = useState(false)

    const [isNewProject, setNewProject] = useState(false)
    const [isNewSkill, setNewSkill] = useState(false)
    const [isNewSoftskill, setNewSoftskill] = useState(false)

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
        loading,
        error,
        profile,
        projects,
        skills,
        softskills, } = useFetchData();

    const handleShowAside = () => {
        setAside(true)
    }

    const handleHideAside = () => {
        setAside(false)
    }

    const handleCreateProject = () => {
        handleCreateModal('newProject');
    };

    const handleCreateSkill = () => {
        handleCreateModal('newSkill');
    };

    const handleCreateSoftskill = () => {
        handleCreateModal('newSoftskill');
    };

    const handleOpenModal = (id: string, modalType: UpdateModalType) => {
        setSkillId('');
        setProfileId('');
        setProjectId('');
        setSoftskillId('');

        const stateMap: Record<UpdateModalType,
            React.Dispatch<React.SetStateAction<string>>> = {
            profile: setProfileId,
            project: setProjectId,
            skill: setSkillId,
            softskill: setSoftskillId,
        };

        const setState = stateMap[modalType];
        if (setState) {
            setState(id);
            openModal();
        }
    };

    const handleCreateModal = (modalType: CreateModalType) => {
        setSkillId('');
        setProjectId('');
        setProfileId('');
        setSoftskillId('');
        handleHideAside();
        setNewProject(false)
        setNewSkill(false)
        setNewSoftskill(false)

        const stateMap: Record<CreateModalType,
            React.Dispatch<React.SetStateAction<boolean>>> = {
            newProject: setNewProject,
            newSkill: setNewSkill,
            newSoftskill: setNewSoftskill,
        };

        const setState = stateMap[modalType];
        if (setState) {
            setState(true);
            openModal();
        }
    };

    return (
        <>
            {loading && <Loader />}
            {error && <p>Deu erro</p>}

            {modal && isNewProject && (
                <CreateProjectModal
                    closeModal={closeModal}
                    toggleModal={toggleModal}
                />
            )}

            {modal && isNewSkill && (
                <CreateSKillModal
                    closeModal={closeModal}
                    toggleModal={toggleModal}
                />
            )}

            {modal && isNewSoftskill && (
                <CreateSoftskillModal
                    closeModal={closeModal}
                    toggleModal={toggleModal}
                />
            )}

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

            {aside && (
                <section
                    className='flex items-center justify-center fixed top-16 right-0 bg-transparent overflow-y-auto animate-fade'>
                    <section
                        className='relative flex items-center justify-between h-auto max-w-6xl rounded-lg flex-col bg-transparent p-4'
                    >
                        <aside className='flex flex-col'>
                            <Button
                                title='Projeto'
                                width='w-60'
                                svg={<BiAddToQueue />}
                                onClick={handleCreateProject}
                            />

                            <Button
                                title='Habilidade'
                                width='w-60'
                                svg={<BiAddToQueue />}
                                onClick={handleCreateSkill}
                            />

                            <Button
                                title='Competência'
                                width='w-60'
                                svg={<BiAddToQueue />}
                                onClick={handleCreateSoftskill}
                            />
                        </aside>
                    </section>
                </section>
            )}

            <section
                className='flex flex-col justify-between items-center w-screen h-screen p-2 bg-backgroundPrimary'
                onClick={handleHideAside}
            >
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
                                onClick={() => handleOpenModal(profile.id!, 'profile')}
                            />
                        ))}

                        <Button
                            title='Adicionar'
                            width='w-60'
                            svg={<HiOutlineFolderAdd />}
                            onMouseOver={handleShowAside}
                        />

                    </nav>
                </header>

                <article className='flex justify-center items-center w-full'>
                    <section className='flex justify-start items-center flex-col max-h-80 m-4 overflow-y-scroll overflow-x-hidden'>
                        {projects && projects
                            .sort((a, b) => a.order - b.order)
                            .map(project => (
                                <Button
                                    key={project.id}
                                    title={project.project_name}
                                    svg={<FiEdit className='text-white w-6 h-6' />}
                                    onClick={() => handleOpenModal(project.id!, 'project')}
                                />
                            ))}
                    </section>

                    <section className='flex justify-start items-center flex-col max-h-80 m-4 overflow-y-scroll'>
                        {skills && skills.map(skill => (
                            <Button
                                key={skill.id}
                                title={skill.skill_name}
                                svg={<FiEdit className='text-white w-6 h-6' />}
                                onClick={() => handleOpenModal(skill.id!, 'skill')}
                            />
                        ))}
                    </section>

                    <section className='flex justify-start items-center flex-col max-h-80 m-4 overflow-y-scroll'>
                        {softskills && softskills.map(softskill => (
                            <Button
                                key={softskill.id}
                                title={softskill.softskill_name}
                                svg={<FiEdit className='text-white w-6 h-6' />}
                                onClick={() => handleOpenModal(softskill.id!, 'softskill')}
                            />
                        ))}
                    </section>
                </article>
            </section>
        </>
    )
}

export default Dashboard;