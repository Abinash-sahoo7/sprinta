
'use client'

import { dataGridClassNames, dataGridSxStyles } from '@/app/lib/utils'
import { useAppSelector } from '@/app/redux'
import { useGetTasksByUserQuery } from '@/app/state/api'
import { Priority, Task } from '@/app/types'
import Header from '@/components/Header/index'
import ModelNewTask from '@/components/ModelNewTask'
import TaskCard from '@/components/TaskCard'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useState } from 'react'

type Props = {
    priority: Priority
}

const columns: GridColDef[] = [
    {
        field: 'title',
        headerName: 'Title',
        width: 100,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 200,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 130,
        renderCell: (params) => (
            <span className='inline-flex rounded-full bg-green-100 px-2 text-sm font-semibold leading-5 text-green-800'>
                {params.value}
            </span>
        )
    },
    {
        field: 'priority',
        headerName: 'Priority',
        width: 75,
    },
    {
        field: 'tags',
        headerName: 'Tags',
        width: 130,
    },
    {
        field: 'startDate',
        headerName: 'Start Date',
        width: 130,
    },
    {
        field: 'dueDate',
        headerName: 'Due Date',
        width: 130,
    },
    {
        field: 'author',
        headerName: 'Author',
        width: 150,
        renderCell: (params) => params.value.username || 'Unknown',
    },
    {
        field: 'assignee',
        headerName: 'Assignee',
        width: 150,
        renderCell: (params) => params.value.username || 'Unassigned',
    }
];

const ReuseablePriorityPage = ({ priority }: Props) => {

    const [view, setView] = useState("list");
    const [isModelNewTaskOpen, setIsModelNewtaskOpen] = useState(false);

    const userId = 1;
    const { data: tasks, isLoading } = useGetTasksByUserQuery(userId || 0, {
        skip: userId === null,
    });

    const darkMode = useAppSelector((state) => state.global.isDarkMode);

    const filteredTask = tasks?.filter((task: Task) => task.priority === priority,)

    return (
        <div className='m-5 p-4'>
            <ModelNewTask
                isOpen={isModelNewTaskOpen}
                onClose={() => setIsModelNewtaskOpen(false)}
            />

            <Header name='Priority page'
                buttonComponent={
                    <button
                        className='mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
                        onClick={() => setIsModelNewtaskOpen(true)}
                    > Add Task</button>
                }
            />

            <div className='mb-4 flex justify-start'>
                <button className={`px-4 py-2 ${view === "list" ? "bg-blue-500" : "bg-gray-200"}`} onClick={() => setView("list")}>

                    List
                </button>
                <button className={`px-4 py-2 ${view === "table" ? "bg-blue-500" : "bg-gray-200"}`} onClick={() => setView("table")}>
                    Table
                </button>
            </div>

            {
                isLoading ? (<div>Task Loading...</div>) :
                    view === "list"
                        ? (
                            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
                                {filteredTask?.map((task: Task) => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>
                        )
                        : (
                            view === "table" && filteredTask && (
                                <div className='w-full'>
                                    <DataGrid
                                        rows={filteredTask}
                                        columns={columns}
                                        checkboxSelection
                                        getRowId={(row) => row.id}
                                        className={dataGridClassNames}
                                        sx={dataGridSxStyles(darkMode)}
                                    />
                                </div>
                            )
                        )
            }
        </div>
    )
}

export default ReuseablePriorityPage