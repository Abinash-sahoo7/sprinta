import { Project } from '@/app/types'
import React from 'react'

type Props = {
    project: Project
}

const ProjectCard = ({ project }: Props) => {
    return (
        <div className='flex flex-col gap-2 rounded border p-4 shadow mb-4 dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex items-center justify-between'>
                <h3 className='text-lg font-medium dark:text-white'>{project.name}</h3>
            </div>
            <p className='text-gray-600 dark:text-gray-300'>{project.description}</p>
            <div className='flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
                <p>Start Date: {project.startDate}</p>
                <p>End Date: {project.endDate}</p>
            </div>
        </div>
    )
}

export default ProjectCard