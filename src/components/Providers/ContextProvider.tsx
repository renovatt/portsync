'use client'

import { useToggle } from '../../hooks/useToggle';
import useAPI from '../../hooks/useAPI';
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
    secretKeyModal: false,
    secretKeyLoading: false,
    deleteButton: false,
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
    toggleModal: () => { },
    handleOpenSecretKeyModal: () => { },
    handleCloseSecretKeyModal: () => { },
    handleDeleteButton: () => { },
    setSecretKeyLoading: () => { }
}

const GlobalContext = createContext(initialValue);

export function useGlobalContext() {
    return useContext(GlobalContext);
}

export function ContextProvider({ children }: Children) {
    const [deleteButton, setDeleteButton] = useState(false)
    const [secretKeyLoading, setSecretKeyLoading] = useState(false);
    const [secretKeyModal, setSecretKeyModal] = useState(false);
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
        toggleModal
    } = useToggle();

    const {
        profile,
        projects,
        skills,
        softskills,
        error,
        loading
    } = useAPI();

    const handleDeleteButton = () => {
        setDeleteButton(true)
    }

    const handleOpenSecretKeyModal = () => {
        setSecretKeyModal(true)
    }

    const handleCloseSecretKeyModal = () => {
        setSecretKeyModal(false)
    }

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
        secretKeyModal,
        secretKeyLoading,
        deleteButton,
        handleOpenSecretKeyModal,
        handleCloseSecretKeyModal,
        handleDeleteButton,
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
        setSecretKeyLoading
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
}