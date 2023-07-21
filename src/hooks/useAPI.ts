import { useState, useEffect } from 'react';
import {
    getSkills,
    getSoftskills,
    getProjects,
    getProfile,
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

    const fetchDataAndAwaitAll = async () => {
        try {
            setLoading(true);
            setError(false);

            await Promise.all(
                [
                    fetchProjects(),
                    fetchSkills(),
                    fetchSoftskills()
                ]
            )
        } catch (error) {
            setError('Erro ao obter os dados.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchDataAndAwaitAll();
    }, []);

    return {
        loading,
        error,
        profile,
        skills,
        softskills,
        projects,
        fetchSoftskills,
        fetchSkills,
        fetchProjects
    };
};

export default useAPI;