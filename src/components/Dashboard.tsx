'use client'

import Button from './Button'
import { FiEdit } from 'react-icons/fi'
import { Table, TableCell, TableRow } from './Table'
import { useGlobalContext } from '@/components/Providers/ContextProvider'
import UpdateProjectModal from './Modals/UpdateProjectModal'
import UpdateSkillModal from './Modals/UpdateSkillModal'
import UpdateProlileModal from './Modals/UpdateProlileModal'
import UpdateSoftSkillModal from './Modals/UpdateSoftSkillModal'
import CreateProjectModal from './Modals/CreateProjectModal'
import CreateSoftskillModal from './Modals/CreateSoftskillModal'
import CreateSkillModal from './Modals/CreateSkillModal'

const Dashboard = () => {
    const {
        projects,
        skills,
        softskills,
        aside,
        modal,
        isNewProject,
        isNewSkill,
        isNewSoftskill,
        profileId,
        projectId,
        skillId,
        softskillId,
        handleOpenModal,
        closeModal,
        toggleModal,
    } = useGlobalContext();

    return (
        <>
            {modal && isNewProject && (
                <CreateProjectModal
                    closeModal={closeModal}
                    toggleModal={toggleModal}
                />
            )}

            {modal && isNewSkill && (
                <CreateSkillModal
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

            <section
                className='flex flex-col justify-center items-center min-h-[70vh] w-screen max-w-[1200px] lg:max-h-[800px] p-2 md:m-0 mb-8 bg-backgroundPrimary overflow-hidden'
            >
                <article className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full ${aside ? 'mt-48' : 'm-0'} transition-all`}>
                    <Table headers={['Projetos']}>
                        {projects &&
                            projects
                                .sort((a, b) => a.order - b.order)
                                .map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell>
                                            <Button
                                                title={project.project_name}
                                                svg={<FiEdit className="text-white w-6 h-6" />}
                                                onClick={() => handleOpenModal(project.id!, 'project')}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                    </Table>

                    <Table headers={['Habilidades']}>
                        {skills &&
                            skills.map((skill) => (
                                <TableRow key={skill.id}>
                                    <TableCell>
                                        <Button
                                            title={skill.skill_name}
                                            svg={<FiEdit className="text-white w-6 h-6" />}
                                            onClick={() => handleOpenModal(skill.id!, 'skill')}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </Table>

                    <Table headers={['Competências']}>
                        {softskills &&
                            softskills.map((softskill) => (
                                <TableRow key={softskill.id}>
                                    <TableCell>
                                        <Button
                                            title={softskill.softskill_name}
                                            svg={<FiEdit className="text-white w-6 h-6" />}
                                            onClick={() => handleOpenModal(softskill.id!, 'softskill')}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </Table>
                </article>
            </section>
        </>
    )
}

export default Dashboard;