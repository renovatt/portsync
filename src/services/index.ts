import {
    APIProfileIdResponse,
    APIProfileResponse,
    APIProjectResponse,
    APIProjectsResponse,
    APISkillResponse,
    APISkillsResponse,
    APISoftskillResponse,
    APISoftskillsResponse,
} from "@/@types";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const getSkills = async (): Promise<APISkillsResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/skills`);
        const data = await response.json();

        if (response.ok) {
            return { skills: data.skills };
        } else {
            throw new Error(data);
        }
    } catch (error) {
        return { error: 'An error occurred' };
    }
};

export const getSoftskills = async (): Promise<APISoftskillsResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/softskills`);
        const data = await response.json();

        if (response.ok) {
            return { softskills: data.softskills };
        } else {
            throw new Error(data.status)
        }
    } catch (error) {
        return { error: 'An error occurred' };
    }
}

export const getProjects = async (): Promise<APIProjectsResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/projects`);
        const data = await response.json();

        if (response.ok) {
            return { projects: data.projects };
        } else {
            throw new Error(data.status);
        }
    } catch (error) {
        return { error: 'An error occurred' };
    }
};

export const getProjectsById = async (id: string): Promise<APIProjectResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/projects/${id}`);
        const data = await response.json();

        if (response.ok) {
            return { project: data };
        } else {
            throw new Error(data.status)
        }
    } catch (error) {
        return { error: 'An error occurred' };
    }
}

export const getProfile = async (): Promise<APIProfileResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/profile`);
        const data = await response.json();

        if (response.ok) {
            return { profile: data.profile };
        } else {
            throw new Error(data.status)
        }
    } catch (error) {
        return { error: 'An error occurred' };
    }
}

export const getSkillById = async (id: string): Promise<APISkillResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/skills/${id}`);
        const data = await response.json();

        if (response.ok) {
            return { skill: data };
        } else {
            throw new Error(data.status)
        }
    } catch (error) {
        return { error: 'An error occurred' };
    }
}

export const getSoftskillById = async (id: string): Promise<APISoftskillResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/softskills/${id}`);
        const data = await response.json();

        if (response.ok) {
            return { softskill: data };
        } else {
            throw new Error(data.status)
        }
    } catch (error) {
        return { error: 'An error occurred' };
    }
}

export const getProfileById = async (id: string): Promise<APIProfileIdResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/profile/${id}`);
        const data = await response.json();

        if (response.ok) {
            return { profile: data };
        } else {
            throw new Error(data.status)
        }
    } catch (error) {
        return { error: 'An error occurred' };
    }
}