import {
    APIProfileIdResponse,
    APIProfileResponse,
    APIProjectResponse,
    APIProjectsResponse,
    APISeretKeyResponse,
    APISkillResponse,
    APISkillsResponse,
    APISoftskillResponse,
    APISoftskillsResponse,
    EncryptedSecretKeyProps,
    ProfileSchema,
    ProjectSchema,
    SkillSchema,
    SoftskillSchema,
} from "@/@types";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const getSkills = async (): Promise<APISkillsResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/skills`);
        const data = await response.json();

        if (response.ok) {
            return { skills: data.skills };
        } else {
            throw new Error(data.status);
        }
    } catch (error) {
        return { error: 'Erro interno.' };
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
        return { error: 'Erro interno.' };
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
        return { error: 'Erro interno.' };
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
        return { error: 'Erro interno.' };
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
        return { error: 'Erro interno.' };
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
        return { error: 'Erro interno.' };
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
        return { error: 'Erro interno.' };
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
        return { error: 'Erro interno.' };
    }
}

export const postSecretkey = async (secretKey: string): Promise<APISeretKeyResponse> => {
    try {
        const secretKeyResponse = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ secretKey }),
        });

        const { encryptedSecretKey }: EncryptedSecretKeyProps = await secretKeyResponse.json();

        if (secretKeyResponse.ok) {
            return encryptedSecretKey
        } else {
            return { error: 'Erro ao receber a chave.' }
        }
    } catch (error) {
        return { error: 'Erro interno.' };
    }
}

export const postProject = async (
    data: ProjectSchema,
    encryptedSecretKey: string
) => {
    try {
        const response = await fetch(`${BASE_URL}/projects`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'secret-key': encryptedSecretKey
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();

        if (response.ok) {
            return { response: json.message }
        } else {
            return { error: json.error }
        }
    } catch (error) {
        return { error: 'Erro interno.' };
    }
}

export const postSkill = async (
    data: SkillSchema,
    encryptedSecretKey: string
) => {
    try {
        const response = await fetch(`${BASE_URL}/skills`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'secret-key': encryptedSecretKey
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();

        if (response.ok) {
            return { response: json.message }
        } else {
            return { error: json.error }
        }
    } catch (error) {
        return { error: 'Erro interno.' };
    }
}

export const postSoftskill = async (
    data: SoftskillSchema,
    encryptedSecretKey: string
) => {
    try {
        const response = await fetch(`${BASE_URL}/softskills`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'secret-key': encryptedSecretKey
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();

        if (response.ok) {
            return { response: json.message }
        } else {
            return { error: json.error }
        }
    } catch (error) {
        return { error: 'Erro interno.' };
    }
}

export const putProfile = async (
    id: string,
    data: ProfileSchema,
    encryptedSecretKey: string
) => {
    try {
        const response = await fetch(`${BASE_URL}/profile/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'secret-key': encryptedSecretKey
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();

        if (response.ok) {
            return { response: json.message }
        } else {
            return { error: json.error }
        }
    } catch (error) {
        return { error: 'Erro interno.' };
    }
}

export const putProject = async (
    id: string,
    data: ProjectSchema,
    encryptedSecretKey: string
) => {
    try {
        const response = await fetch(`${BASE_URL}/projects/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'secret-key': encryptedSecretKey
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();

        if (response.ok) {
            return { response: json.message }
        } else {
            return { error: json.error }
        }
    } catch (error) {
        return { error: 'Erro interno.' };
    }
}

export const putSkill = async (
    id: string,
    data: SkillSchema,
    encryptedSecretKey: string
) => {
    try {
        const response = await fetch(`${BASE_URL}/skills/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'secret-key': encryptedSecretKey
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();

        if (response.ok) {
            return { response: json.message }
        } else {
            return { error: json.error }
        }
    } catch (error) {
        return { error: 'Erro interno.' };
    }
}

export const putSoftskill = async (
    id: string,
    data: SoftskillSchema,
    encryptedSecretKey: string
) => {
    try {
        const response = await fetch(`${BASE_URL}/softskills/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'secret-key': encryptedSecretKey
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();

        if (response.ok) {
            return { response: json.message }
        } else {
            return { error: json.error }
        }
    } catch (error) {
        return { error: 'Erro interno.' };
    }
}

export const deleteProject = async (
    projectId: string,
    encryptedSecretKey: string
) => {
    try {
        const response = await fetch(`${BASE_URL}/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'secret-key': encryptedSecretKey
            }
        })

        const json = await response.json();

        if (response.ok) {
            return { response: json.message }
        } else {
            return { error: json.error }
        }
    } catch (error) {
        return { error: 'Erro interno.' };
    }
}

export const deleteSkill = async (
    skillId: string,
    encryptedSecretKey: string
) => {
    try {
        const response = await fetch(`${BASE_URL}/skills/${skillId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'secret-key': encryptedSecretKey
            }
        })

        const json = await response.json();

        if (response.ok) {
            return { response: json.message }
        } else {
            return { error: json.error }
        }
    } catch (error) {
        return { error: 'Erro interno.' };
    }
}

export const deleteSoftskill = async (
    softskillId: string,
    encryptedSecretKey: string
) => {
    try {
        const response = await fetch(`${BASE_URL}/softskills/${softskillId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'secret-key': encryptedSecretKey
            }
        })

        const json = await response.json();

        if (response.ok) {
            return { response: json.message }
        } else {
            return { error: json.error }
        }
    } catch (error) {
        return { error: 'Erro interno.' };
    }
}