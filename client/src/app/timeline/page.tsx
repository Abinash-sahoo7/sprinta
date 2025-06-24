'use client'


import { useAppSelector } from '@/app/redux';
import { useGetProjectsQuery } from '@/app/state/api';
import React, { useMemo, useState } from 'react'
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import Header from '@/components/Header';



type TaskTypeItems = "task" | "milestone" | "project"

const TimeLine = () => {

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const { data: projects, isLoading, isError } = useGetProjectsQuery();

    const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
        viewMode: ViewMode.Month,
        locale: 'en-US',
    })

    const ganttTasks = useMemo(() => {
        return (
            projects?.map((project) => ({
                start: new Date(project.startDate as string),
                end: new Date(project.endDate as string),
                name: project.name,
                id: `project-${project.id}`,
                type: "project" as TaskTypeItems,
                progress: 50,
                isDisabled: false
            })) || []
        )
    }, [projects])

    const handleViewModeChange = (event: React.ChangeEvent<HTMLSelectElement>,) => {
        setDisplayOptions((prev) => ({
            ...prev,
            viewMode: event.target.value as ViewMode,
        })
        )
    }

    if (isLoading) return <div>Loading...</div>
    if (isError || !projects) return <div className='text-red-500 text-center'>An error occure while fetching the Task..</div>

    return (
        <div className='max-w-full p-8'>
            <header className='mb-4 flex justify-between items-center'>
                <Header name="Project Timeline" />

                <div className='relative inline-block w-64'>
                    <select className='focous:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white'
                        value={displayOptions.viewMode}
                        onChange={handleViewModeChange}
                    >
                        <option value={ViewMode.Day}>Day</option>
                        <option value={ViewMode.Month}>Month</option>
                        <option value={ViewMode.Year}>Year</option>
                    </select>
                </div>
            </header>

            <div className='overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white'>
                <div className='timeline'>
                    <Gantt
                        tasks={ganttTasks}
                        {...displayOptions}
                        columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
                        listCellWidth='100px'
                        projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
                        projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
                        projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
                    />
                </div>
            </div>

        </div>
    )
}

export default TimeLine

