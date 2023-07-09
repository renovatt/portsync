import { z } from "zod";
import { ReactElement } from "react";
import {
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

export type ProfileSchema = z.infer<typeof profileSchema>
export type ProjectSchema = z.infer<typeof projectSchema>
export type SkillSchema = z.infer<typeof skillSchema>
export type SoftskillSchema = z.infer<typeof softskillSchema>

export type APISkillsResponse = SkillsResponse | ErrorResponseProps;
export type APISoftskillsResponse = SoftskillsResponse | ErrorResponseProps;
export type APIProjectsResponse = ProjectsResponse | ErrorResponseProps;
export type APIProjectResponse = ProjectResponse | ErrorResponseProps;
export type APIProfileResponse = ProfileResponse | ErrorResponseProps;
export type APISkillResponse = SkillResponse | ErrorResponseProps;
export type APISoftskillResponse = SoftskillResponse | ErrorResponseProps;
export type APIProfileIdResponse = ProfileIdResponse | ErrorResponseProps;

export type ContainerTypeProps = {
    children: React.ReactNode;
}

export type ModalTypeProps = {
    id?: string;
    closeModal: () => void;
    toggleModal: () => void;
}

export type ButtonProps = {
    title: string;
    svg: ReactElement;
    width?: string;
    onClick?: () => void;
    onMouseOver?: () => void;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

export type InputProps = {
    name: string;
    label: string;
    width?: string;
    placeholder: string;
};

export type ListProps = {
    title: string;
}

export type CreateModalType = 'newProject' | 'newSkill' | 'newSoftskill';
export type UpdateModalType = 'profile' | 'project' | 'skill' | 'softskill';