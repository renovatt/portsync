import React from 'react';
import {
    getProfile,
    getProjects,
    getSkills,
    getSoftskills
} from '@/services';
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

const useFetchData = () => {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [profile, setProfile] = React.useState<ProfileSchema[]>()
    const [projects, setProjects] = React.useState<ProjectSchema[]>([])
    const [skills, setSkills] = React.useState<SkillSchema[]>([]);
    const [softskills, setSoftSkills] = React.useState<SoftskillSchema[]>([]);

    const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
            const profile = await getProfile()
            const projects = await getProjects()
            const [skills, softskills] = await Promise
                .all([getSkills(), getSoftskills()])

            if ('skills' in skills) {
                setSkills(skills.skills)
            } else if ('error' in skills) {
                setError(true)
            }

            if ('softskills' in softskills) {
                setSoftSkills(softskills.softskills)
            } else if ('error' in softskills) {
                setError(true)
            }

            if ('projects' in projects) {
                setProjects(projects.projects)
            } else if ('error' in projects) {
                setError(true)
            }

            if ('profile' in profile) {
                setProfile(profile.profile)
            } else if ('error' in profile) {
                setError(true)
            }

        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return {
        error,
        loading,
        profile,
        projects,
        skills,
        softskills,
    };
};

export default useFetchData;