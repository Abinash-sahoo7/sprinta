import { useAppSelector } from '@/app/redux';
import { useGetTasksQuery } from '@/app/state/api';
import React, { useMemo, useState } from 'react'
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";


type TimeLineProps = {
    id: string;
    setIsModelNewTaskOpen: (isOpen: boolean) => void;
}

type TaskTypeItems = "task" | "milestone" | "project"

const TimeLine = ({ id, setIsModelNewTaskOpen }: TimeLineProps) => {

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const { data: tasks, isLoading, error } = useGetTasksQuery(Number(id));

    const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
        viewMode: ViewMode.Month,
        locale: 'en-US',
    })

    const ganttTasks = useMemo(() => {
        return (
            tasks?.map((task) => ({
                start: new Date(task.startDate as string),
                end: new Date(task.dueDate as string),
                name: task.title,
                id: `task-${task.id}`,
                type: "task" as TaskTypeItems,
                progress: task.points ? (task.points / 10) * 100 : 0,
                isDisabled: false
            })) || []
        )
    }, [tasks])

    const handleViewModeChange = (event: React.ChangeEvent<HTMLSelectElement>,) => {
        setDisplayOptions((prev) => ({
            ...prev,
            viewMode: event.target.value as ViewMode,
        })
        )
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div className='text-red-500 text-center'>An error occure while fetching the Task..</div>

    return (
        <div className='px-4 xl:px-6'>
            <div className='flex items-center justify-between g-whiteap-2 py-5'>
                <h1 className='me-2 text-lg font-bold dark:text-white'>
                    Project Tasks Timeline
                </h1>

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
            </div>

            <div className='overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white'>
                <div className='timeline'>
                    <Gantt
                        tasks={ganttTasks}
                        {...displayOptions}
                        columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
                        listCellWidth='100px'
                        barBackgroundColor={isDarkMode ? '#101214' : '#aeb8c2'}
                        barBackgroundSelectedColor={isDarkMode ? '#000' : '#9ba1a6'}
                    />
                </div>
                <div className='px-4 pb-5 pt-1'>
                    <button className='flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600'
                        onClick={() => setIsModelNewTaskOpen(true)}
                    >
                        Add New Task
                    </button>
                </div>
            </div>

        </div>
    )
}

export default TimeLine