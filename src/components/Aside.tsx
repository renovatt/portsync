import { useGlobalContext } from '@/components/Providers/ContextProvider';
import Button from './Button';
import { BiAddToQueue } from 'react-icons/bi';

function Aside() {
    const {
        handleCreateProject,
        handleCreateSkill,
        handleCreateSoftskill
    } = useGlobalContext();

    return (
        <section className='flex items-center justify-center absolute top-12 right-0 bg-transparent overflow-y-auto animate-fade'>
            <section className='relative flex items-center justify-between max-w-6xl rounded-lg flex-col bg-transparent py-4'>
                <aside className='flex flex-col'>
                    <Button
                        title='Projeto'
                        width='w-44 md:w-60'
                        svg={<BiAddToQueue />}
                        onClick={handleCreateProject}
                    />
                    <Button
                        title='Habilidade'
                        width='w-44 md:w-60'
                        svg={<BiAddToQueue />}
                        onClick={handleCreateSkill}
                    />
                    <Button
                        title='Competência'
                        width='w-44 md:w-60'
                        svg={<BiAddToQueue />}
                        onClick={handleCreateSoftskill}
                    />
                </aside>
            </section>
        </section>
    );
}

export default Aside;
