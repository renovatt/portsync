import { useState, useEffect } from 'react';
import {
    postProject,
    postSkill,
    postSoftskill,
    putProject,
    putSkill,
    deleteProject,
    deleteSkill,
    getSkills,
    getSoftskills,
    getProjects,
    getProfile,
    putSoftskill,
    deleteSoftskill,
    postSecretkey,
    putProfile
} from '../services';
import {
    ProfileSchema,
    ProjectSchema,
    SkillSchema,
    SoftskillSchema
} from '@/@types';

export const profileInitialValue: ProfileSchema = {
    id: '',
    description_1: '',
    description_2: ''
}

export const projectInitialValue: ProjectSchema = {
    id: '',
    order: 0,
    project_name: '',
    deploy_url: '',
    banner_url: '',
    thumbnail_url: '',
    description: '',
    techs: {
        links: [
            {
                id: '',
                svg_name: '',
                link: '',
                svg_link: ''
            }
        ]
    }
}

export const skillInitialValue: SkillSchema = {
    id: '',
    skill_name: '',
    svg_link: '',
    description: '',
}

export const softskillInitialValue: SoftskillSchema = {
    id: '',
    softskill_name: ''
}

const useAPI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | boolean>(false);
    const [response, setResponse] = useState<string | null>(null);
    const [profile, setProfile] = useState<ProfileSchema[]>([])
    const [projects, setProjects] = useState<ProjectSchema[]>([]);
    const [skills, setSkills] = useState<SkillSchema[]>([]);
    const [softskills, setSoftskills] = useState<SoftskillSchema[]>([]);

    const fetchProfile = async () => {
        setLoading(true);
        setError(false);

        try {
            const profile = await getProfile();

            if ('profile' in profile) {
                setProfile(profile.profile);
            } else if ('error' in profile) {
                setError(error);
            }
        } catch (error) {
            setError('Erro ao obter as habilidades.');
        } finally {
            setLoading(false);
        }
    };

    const fetchSkills = async () => {
        setLoading(true);
        setError(false);

        try {
            const skills = await getSkills();

            if ('skills' in skills) {
                setSkills(skills.skills);
            } else if ('error' in skills) {
                setError(error);
            }
        } catch (error) {
            setError('Erro ao obter as habilidades.');
        } finally {
            setLoading(false);
        }
    };

    const fetchSoftskills = async () => {
        setLoading(true);
        setError(false);

        try {
            const softskills = await getSoftskills();

            if ('softskills' in softskills) {
                setSoftskills(softskills.softskills);
            } else if ('error' in softskills) {
                setError(true);
            }
        } catch (error) {
            setError('Erro ao obter as softskills.');
        } finally {
            setLoading(false);
        }
    };

    const fetchProjects = async () => {
        setLoading(true);
        setError(false);

        try {
            const projects = await getProjects();

            if ('projects' in projects) {
                setProjects(projects.projects);
            } else if ('error' in projects) {
                setError(true);
            }
        } catch (error) {
            setError('Erro ao obter os projetos.');
        } finally {
            setLoading(false);
        }
    };

    const postProjectData = async (data: ProjectSchema, encryptedSecretKey: string) => {
        setLoading(true);
        setError(false);
        setResponse(null);

        try {
            const { response, error } = await postProject(data, encryptedSecretKey);

            if (response) {
                setResponse(response);
            } else {
                setError(error);
            }
        } catch (error) {
            setError('Erro ao enviar projeto.');
        } finally {
            setLoading(false);
        }
    };

    const postSkillData = async (data: SkillSchema, encryptedSecretKey: string) => {
        setLoading(true);
        setError(false);
        setResponse(null);

        try {
            const { response, error } = await postSkill(data, encryptedSecretKey);

            if (response) {
                setResponse(response);
            } else {
                setError(error);
            }
        } catch (error) {
            setError('Erro ao enviar habilidade.');
        } finally {
            setLoading(false);
        }
    };

    const postSoftskillData = async (data: SoftskillSchema, encryptedSecretKey: string) => {
        setLoading(true);
        setError(false);
        setResponse(null);

        try {
            const { response, error } = await postSoftskill(data, encryptedSecretKey);

            if (response) {
                setResponse(response);
            } else {
                setError(error);
            }
        } catch (error) {
            setError('Erro ao enviar softskill.');
        } finally {
            setLoading(false);
        }
    };

    const putProfileData = async (id: string, data: ProfileSchema, encryptedSecretKey: string) => {
        setLoading(true);
        setError(false);
        setResponse(null);

        try {
            const { response, error } = await putProfile(id, data, encryptedSecretKey);

            if (response) {
                setResponse(response);
            } else {
                setError(error);
            }
        } catch (error) {
            setError('Erro ao atualizar perfil.');
        } finally {
            setLoading(false);
        }
    };

    const putProjectData = async (id: string, data: ProjectSchema, encryptedSecretKey: string) => {
        setLoading(true);
        setError(false);
        setResponse(null);

        try {
            const { response, error } = await putProject(id, data, encryptedSecretKey);

            if (response) {
                setResponse(response);
            } else {
                setError(error);
            }
        } catch (error) {
            setError('Erro ao atualizar projeto.');
        } finally {
            setLoading(false);
        }
    };

    const putSkillData = async (id: string, data: SkillSchema, encryptedSecretKey: string) => {
        setLoading(true);
        setError(false);
        setResponse(null);

        try {
            const { response, error } = await putSkill(id, data, encryptedSecretKey);

            if (response) {
                setResponse(response);
            } else {
                setError(error);
            }
        } catch (error) {
            setError('Erro ao atualizar habilidade.');
        } finally {
            setLoading(false);
        }
    };

    const putSoftskillData = async (id: string, data: SoftskillSchema, encryptedSecretKey: string) => {
        setLoading(true);
        setError(false);
        setResponse(null);

        try {
            const { response, error } = await putSoftskill(id, data, encryptedSecretKey);

            if (response) {
                setResponse(response);
            } else {
                setError(error);
            }
        } catch (error) {
            setError('Erro ao atualizar habilidade.');
        } finally {
            setLoading(false);
        }
    };

    const deleteProjectData = async (projectId: string, encryptedSecretKey: string) => {
        setLoading(true);
        setError(false);
        setResponse(null);

        try {
            const { response, error } = await deleteProject(projectId, encryptedSecretKey);

            if (response) {
                setResponse(response);
            } else {
                setError(error);
            }
        } catch (error) {
            setError('Erro ao excluir projeto.');
        } finally {
            setLoading(false);
        }
    };

    const deleteSkillData = async (skillId: string, encryptedSecretKey: string) => {
        setLoading(true);
        setError(false);
        setResponse(null);

        try {
            const { response, error } = await deleteSkill(skillId, encryptedSecretKey);

            if (response) {
                setResponse(response);
            } else {
                setError(error);
            }
        } catch (error) {
            setError('Erro ao excluir habilidade.');
        } finally {
            setLoading(false);
        }
    };

    const deleteSoftskillData = async (softskillId: string, encryptedSecretKey: string) => {
        setLoading(true);
        setError(false);
        setResponse(null);

        try {
            const { response, error } = await deleteSoftskill(softskillId, encryptedSecretKey);

            if (response) {
                setResponse(response);
            } else {
                setError(error);
            }
        } catch (error) {
            setError('Erro ao excluir habilidade.');
        } finally {
            setLoading(false);
        }
    };

    // const postSecretKeyData = async (secretKey: string) => {
    //     setLoading(true);
    //     setError(false);
    //     setResponse(null);

    //     try {
    //         const encryptedSecretKey= await postSecretkey(secretKey);

    //         if (response) {
    //             setResponse(response);
    //         } else {
    //             setError(error);
    //         }
    //     } catch (error) {
    //         setError('Erro ao enviar softskill.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        fetchProfile();
        fetchProjects();
        fetchSkills();
        fetchSoftskills();
    }, []);

    return {
        loading,
        error,
        response,
        profile,
        skills,
        softskills,
        projects,
        postProjectData,
        postSkillData,
        postSoftskillData,
        putProfileData,
        putProjectData,
        putSkillData,
        putSoftskillData,
        deleteProjectData,
        deleteSkillData,
        deleteSoftskillData,
    };
};

export default useAPI;