import { z } from "zod";
import { ReactElement } from "react";
import {
    secretKeySchema,
    profileSchema,
    projectSchema,
    skillSchema,
    softskillSchema
} from "@/zod";

type SkillsResponse = {
    skills: SkillSchema[];
}

type SoftskillsResponse = {
    softskills: SoftskillSchema[];
}

type ProjectsResponse = {
    projects: ProjectSchema[];
}

type ProfileResponse = {
    profile: ProfileSchema[];
}

type ProjectResponse = {
    project: ProjectSchema;
}

type SkillResponse = {
    skill: SkillSchema;
}

type SoftskillResponse = {
    softskill: SoftskillSchema;
}

type ProfileIdResponse = {
    profile: ProfileSchema;
}

type ErrorResponseProps = {
    error: string;
}

export type Children = {
    children: React.ReactNode;
}

export type FormProps = {
    children: React.ReactNode;
    onSubmit: () => void;
}

export type TableProps = {
    headers: string[];
    children: React.ReactNode;
}

export type ModalProps = {
    children: React.ReactNode;
    closeModal: () => void;
    toggleModal: () => void;
}

export type ModalFunctionProps = {
    id?: string;
    closeModal: () => void;
    toggleModal: () => void;
}

export interface SecretKeyModalProps extends ModalFunctionProps {
    handleSecretKeyModalSubmit: (secretKey: string) => void;
}

export type ButtonProps = {
    title: string;
    svg: ReactElement;
    width?: string;
    textHidden?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

export type InputProps = {
    name: string;
    label: string;
    width?: string;
    type?: string;
    placeholder: string;
};

export type TextAreaProps = {
    name: string;
    label: string;
    placeholder: string;
    width?: string;
    rows?: number;
}

export type ListProps = {
    title: string;
}

export type EncryptedSecretKeyProps = {
    encryptedSecretKey: string;
}

export type CreateModalFunctionProps = 'newProject' | 'newSkill' | 'newSoftskill';
export type UpdateModalFunctionProps = 'profile' | 'project' | 'skill' | 'softskill';

export type ProfileSchema = z.infer<typeof profileSchema>
export type ProjectSchema = z.infer<typeof projectSchema>
export type SkillSchema = z.infer<typeof skillSchema>
export type SoftskillSchema = z.infer<typeof softskillSchema>
export type SecretKeySchema = z.infer<typeof secretKeySchema>

export type APIProjectsResponse = ProjectsResponse | ErrorResponseProps;
export type APISkillsResponse = SkillsResponse | ErrorResponseProps;
export type APISoftskillsResponse = SoftskillsResponse | ErrorResponseProps;

export type APIProfileResponse = ProfileResponse | ErrorResponseProps;
export type APIProjectResponse = ProjectResponse | ErrorResponseProps;

export type APISkillResponse = SkillResponse | ErrorResponseProps;
export type APISoftskillResponse = SoftskillResponse | ErrorResponseProps;
export type APIProfileIdResponse = ProfileIdResponse | ErrorResponseProps;

export type APISeretKeyResponse = string | ErrorResponseProps;

export type InitialValueProps = {
    profile: ProfileSchema[];
    projects: ProjectSchema[];
    skills: SkillSchema[];
    softskills: SoftskillSchema[];
    loading: boolean;
    error: boolean | string;
    modal: boolean;
    aside: boolean;
    secretKeyModal: boolean;
    deleteButton: boolean;
    isMobileButtonActive: boolean;
    isNewProject: boolean;
    isNewSkill: boolean;
    isNewSoftskill: boolean;
    profileId: string,
    projectId: string,
    skillId: string,
    softskillId: string,
    handleOpenSecretKeyModal: () => void,
    handleCloseSecretKeyModal: () => void,
    handleDeleteButton: () => void,
    handleShowAndHideAside: () => void,
    handleHideAside: () => void,
    handleCreateProject: () => void,
    handleCreateSkill: () => void,
    handleCreateSoftskill: () => void,
    closeModal: () => void,
    toggleModal: () => void
    handleOpenModal: (id: string, modalType: UpdateModalFunctionProps) => void,
    handleCreateModal: (modalType: CreateModalFunctionProps) => void,
};