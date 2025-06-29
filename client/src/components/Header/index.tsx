import React from 'react';
import { Project } from '@/app/types';

type Props = {
    name: string;
    buttonComponent?: React.ReactNode;
    isSmallText?: boolean;
    allProjects?: Project[]; // All projects for dropdown
    selectedProjectId?: string | null; // Currently selected project ID
    onProjectSelect?: (projectId: string) => void; // Optional selection handler
}

const Header = ({ name, buttonComponent, isSmallText = false, allProjects, selectedProjectId, onProjectSelect }: Props) => {

    const [selectedTask, setSelectedTask] = React.useState(selectedProjectId ?? '');

    const getDropdownStyles = () => {
        return {
            select: 'w-[180px] h-[38px] px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 dark:text-white dark:border-gray-600 dark:bg-gray-800 dark:focus:border-blue-500 dark:focus:ring-blue-900 transition-all duration-200',
            option: 'dark:bg-gray-800 dark:text-white'
        };
    };

    const styles = getDropdownStyles();

    const handleProjectSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTask(event.target.value);
        if (onProjectSelect) {
            onProjectSelect(event.target.value);
        }
    };

    return (
        <div className='flex mb-5 w-full items-center justify-between'>
            <h1 className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold dark:text-white`}>{name}</h1>
            <div className="flex items-center space-x-2">
                {allProjects && allProjects.length > 0 && onProjectSelect && (
                    <select
                        value={selectedTask}
                        onChange={handleProjectSelect}
                        className={styles.select}
                    >
                        <option value="">Select Project</option>
                        {allProjects?.map((project) => (
                            <option
                                key={project.id}
                                value={project.id.toString()}
                                className={styles.option}
                            >
                                {project.name}
                            </option>
                        ))}
                    </select>
                )}
                {buttonComponent}
            </div>
        </div>
    )
}

export default Header;