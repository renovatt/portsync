'use client'

import { useToggle } from './useToggle';
import useFetchData from './useFetchData';
import {
    createContext,
    useContext,
    useState
} from 'react';
import {
    Children,
    CreateModalFunctionProps,
    InitialValueProps,
    UpdateModalFunctionProps
} from '@/@types';

const initialValue: InitialValueProps = {
    modal: false,
    loading: false,
    error: false,
    profile: [],
    projects: [],
    skills: [],
    softskills: [],
    aside: false,
    isMobileButtonActive: false,
    isNewProject: false,
    isNewSkill: false,
    isNewSoftskill: false,
    profileId: '',
    projectId: '',
    skillId: '',
    softskillId: '',
    handleShowAndHideAside: () => { },
    handleHideAside: () => { },
    handleCreateProject: () => { },
    handleCreateSkill: () => { },
    handleCreateSoftskill: () => { },
    handleOpenModal: () => { },
    handleCreateModal: () => { },
    closeModal: () => { },
    toggleModal: () => { }
}

const GlobalContext = createContext(initialValue);

export function useGlobalContext() {
    return useContext(GlobalContext);
}

export function ContextProvider({ children }: Children) {
    const [aside, setAside] = useState(false);
    const [isMobileButtonActive, setIsMobileButtonActive] = useState(false);
    const [isNewProject, setNewProject] = useState(false);
    const [isNewSkill, setNewSkill] = useState(false);
    const [isNewSoftskill, setNewSoftskill] = useState(false);
    const [profileId, setProfileId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [skillId, setSkillId] = useState('');
    const [softskillId, setSoftskillId] = useState('');

    const {
        modal,
        openModal,
        closeModal,
        toggleModal } = useToggle();

    const {
        profile,
        projects,
        skills,
        softskills,
        error,
        loading
    } = useFetchData();

    const handleShowAndHideAside = () => {
        setAside(!aside)
        setIsMobileButtonActive(!isMobileButtonActive)
    }

    const handleHideAside = () => {
        setAside(false)
        setIsMobileButtonActive(false)
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

    const handleOpenModal = (id: string, modalType: UpdateModalFunctionProps) => {
        setSkillId('');
        setProfileId('');
        setProjectId('');
        setSoftskillId('');
        handleHideAside();
        setNewProject(false)
        setNewSkill(false)
        setNewSoftskill(false)

        const stateMap: Record<UpdateModalFunctionProps,
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

    const handleCreateModal = (modalType: CreateModalFunctionProps) => {
        setSkillId('');
        setProjectId('');
        setProfileId('');
        setSoftskillId('');
        handleHideAside();
        setNewProject(false)
        setNewSkill(false)
        setNewSoftskill(false)

        const stateMap: Record<CreateModalFunctionProps,
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

    const contextValue: InitialValueProps = {
        error,
        loading,
        profile,
        projects,
        skills,
        softskills,
        aside,
        isMobileButtonActive,
        isNewProject,
        isNewSkill,
        isNewSoftskill,
        profileId,
        projectId,
        skillId,
        softskillId,
        modal,
        handleShowAndHideAside,
        handleHideAside,
        handleCreateProject,
        handleCreateSkill,
        handleCreateSoftskill,
        handleOpenModal,
        handleCreateModal,
        closeModal,
        toggleModal,
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
}