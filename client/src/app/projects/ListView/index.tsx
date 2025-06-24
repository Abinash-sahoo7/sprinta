import { useGetTasksQuery } from '@/app/state/api';
import { Task } from '@/app/types';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import { PlusSquare } from 'lucide-react';
import React from 'react'

type ListProps = {
    id: string;
    setIsModelNewTaskOpen: (isOpen: boolean) => void;
}

const ListView = ({ id, setIsModelNewTaskOpen }: ListProps) => {

    const { data: tasks, isLoading, error } = useGetTasksQuery(Number(id));

    if (isLoading) return <div>Loading...</div>
    if (error) return <div className='text-red-500 text-center'>An error occure while fetching the Task..</div>

    return (
        <div className='px-4 pb-8 xl:pb-6'>
            <div className='pt-4 mx-4'>
                <Header name='List'
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
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
                {tasks?.map((task: Task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}

export default ListView