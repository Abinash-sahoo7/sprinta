import { useAppSelector } from '@/app/redux';
import { useGetTasksQuery } from '@/app/state/api';

import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { dataGridClassNames, dataGridSxStyles } from '@/app/lib/utils';
import { PlusSquare } from 'lucide-react';
import Header from '@/components/Header/index';

type TableViewProps = {
    id: string;
    setIsModelNewTaskOpen: (isOpen: boolean) => void;
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
        renderCell: (params) => params.value?.author || 'Unknown',
    },
    {
        field: 'assignee',
        headerName: 'Assignee',
        width: 150,
        renderCell: (params) => params.value?.assignee || 'Unassigned',
    }
];


const TableView = ({ id, setIsModelNewTaskOpen }: TableViewProps) => {

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const { data: tasks, isLoading, error } = useGetTasksQuery(Number(id));
    console.log('tasks : ', tasks);
    console.log('isDarkMode : ', isDarkMode);

    if (isLoading) return <div>Loading...</div>
    if (error || !tasks) return <div className='text-red-500 text-center'>An error occure while fetching the Task..</div>

    return (
        <div className='h-[540px] w-full px-4 pb-8 xl:pb-6'>
            <div className='mt-2 mx-4'>
                <Header name='Table'
                    buttonComponet={
                        <button className='flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600'
                            onClick={() => setIsModelNewTaskOpen(true)}
                        >
                            <PlusSquare className='h-5 w-5 mr-2' /> New Task
                        </button>
                    }
                    isSmallText={true}
                />
            </div>

            <DataGrid
                rows={tasks}
                columns={columns}
                className={dataGridClassNames}
                sx={dataGridSxStyles(isDarkMode)}
            />
        </div>
    )
}

export default TableView;


