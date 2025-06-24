import { useGetTasksQuery, useUpdateTaskStatusMutation } from '@/app/state/api';
import { Task as TaskType } from '@/app/types';
import { EllipsisVertical, MessageCircle, MessageCircleMore, Plus } from 'lucide-react';
import React, { useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { format } from "date-fns";
import Image from 'next/image';

type BoardProps = {
    id: string;
    setIsModelNewTaskOpen: (isOpen: boolean) => void;
}

const taskStatus = ["To Do", "Work In Progress", "Completed", "Under Review"];

const BoardView = ({ id, setIsModelNewTaskOpen }: BoardProps) => {

    console.log('ProjectId : ', Number(id));
    const { data: tasks, isLoading, error } = useGetTasksQuery(Number(id));
    const [updateTaskStatus] = useUpdateTaskStatusMutation();

    console.log('Tasks : ', tasks);
    const moveTask = (taskId: number, toStatus: string) => {
        // console.log('on drop Item : ', taskId); // 41
        // console.log('drop status  : ', toStatus); // Completed
        updateTaskStatus({ taskId, status: toStatus })
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div className='text-red-500 text-center'>An error occure while fetching the Task..</div>

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4'>
                {
                    taskStatus.map((status) => (
                        <TaskColumn
                            key={status}
                            status={status}
                            tasks={tasks || []}
                            moveTask={moveTask}
                            setIsModelNewTaskOpen={setIsModelNewTaskOpen}
                        />
                    ))
                }

            </div>
        </DndProvider>
    )
}

export default BoardView

type TaskColumnProps = {
    status: string;
    tasks: TaskType[];
    moveTask: (taskId: number, toStatus: string) => void;
    setIsModelNewTaskOpen: (isOpen: boolean) => void;
}

const TaskColumn = ({ status, tasks, moveTask, setIsModelNewTaskOpen }: TaskColumnProps) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item: { id: number }) => {
            moveTask(item.id, status)
        },
        collect: (monitor: any) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const taskCount = tasks.filter((task) => task.status === status).length;

    const statusColour = {
        "To Do": "#2563EB",
        "Work In Progress": "#059669",
        "Under Review": "#D97706",
        "Completed": "#000000"
    } as const;

    return (
        <div ref={(instance) => { drop(instance) }} className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-gray-100 dark:bg-neutral-950" : ""}`}>
            <div className='mb-3 flex w-full items-center justify-between'>

                <div className='w-2 h-12 rounded-s-lg' style={{ backgroundColor: statusColour[status as keyof typeof statusColour] }} />

                <div className='flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary'>
                    <h3 className='flex items-center text-lg font-semibold dark:text-white'>
                        {status} {" "}
                        <span className='ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary' style={{ width: "1.5rem", height: "1.5rem" }}>
                            {taskCount}
                        </span>
                    </h3>
                    <div className='flex items-center gap-2'>
                        <button className='flex h-6 w-5 items-center justify-center dark:text-neutral-500'>
                            <EllipsisVertical size={26} />
                        </button>
                        <button className='flex h-6 w-6 items-center justify-center rounded bg-gray-200 cursor-pointer dark:bg-dark-tertiary dark:text-white' onClick={() => setIsModelNewTaskOpen(true)}>
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {
                tasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                        <Task key={task.id} task={task} />
                    ))
            }
        </div>
    )
}

type TaskProps = {
    task: TaskType;
}

const Task = ({ task }: TaskProps) => {
    const [showComments, setShowComments] = useState(false);
    const [{ isdragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor: any) => ({
            isdragging: !!monitor.isDragging()
        })
    }));

    const tasktagSplits = task.tags && task.tags.split(",") || [];
    const formattedStartDate = task.startDate ? format(new Date(task.startDate), "P") : "";
    const formattedDueDate = task.dueDate ? format(new Date(task.dueDate), "P") : "";
    const numberOfComments = task.comments ? task.comments.length : 0;

    const PriorityTag = ({ priority }: { priority: TaskType['priority'] }) => (
        <div className={`rounded-full px-2 py-1 text-xs font-semibold ${priority === "Urgent" ? 'bg-red-200 text-red-700'
            : priority === "High" ? "bg-yellow-200 text-yellow-700"
                : priority === "Medium" ? "bg-green-200 text-green-700"
                    : priority === "Low"
                        ? "bg-blue-200 text-blue-700" : "bg-gray-200 text-gray-700"
            }`}>
            {priority}
        </div>
    );

    return (
        <div ref={(instance) => { drag(instance) }}
            className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${isdragging ? "opacity-50" : "opacity-100"}`}>
            {task.attachments && task.attachments.length > 0 &&
                (
                    <Image
                        src={`/${task.attachments[0].fileURL}`}
                        alt={task.attachments[0].fileName}
                        width={400}
                        height={200}
                        className="h-auto w-full rounded-t-md"
                    />
                )
            }

            <div className="p-4 md:p-6">
                <div className="flex items-start justify-between">
                    <div className='flex flex-1 flex-wrap items-center gap-2'>
                        {task.priority && <PriorityTag priority={task.priority} />}
                        <div className='flex gap-2'>
                            {tasktagSplits.map((tag) => (
                                <div key={tag} className='rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold'>
                                    {""}
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className='flex h-6 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-dark-tertiary'>
                        <EllipsisVertical size={26} />
                    </button>
                </div>

                <div className='my-3 flex justify-between'>
                    <h4 className='text-md font-bold dark:text-white'>{task.title}</h4>
                    {typeof task.points === "number" && (
                        <div className='text-xs font-semibold dark:text-white'>
                            {task.points} points
                        </div>
                    )}
                </div>

                <div className='text-sm text-gray-500 dark:text-neutral-500'>
                    {formattedStartDate && <span>{formattedStartDate}  -  </span>}
                    {formattedDueDate && <span>{formattedDueDate}</span>}
                </div>

                <p className='text-sm text-gray-600 dark:text-neutral-600'>
                    {task.description}
                </p>

                <div className='mt-4 border-t border-gray-200 dark:border-stroke-dark'></div>

                {/* Users  */}

                {/* {task.assignee && <span><span>Assignee : </span>{task.assignee.profilePictureUrl}</span>}
                {task.author && <span><span>Author : </span>{task.author.profilePictureUrl}</span>} */}
                <div className='mt-3 flex items-center justify-between'>
                    <div className='flex -space-x-[6px] overflow-hidden'>
                        {task.assignee && (
                            <Image
                                key={task.assignee.userid}
                                src={`/${task.assignee.profilePictureUrl}`}
                                alt={task.assignee.username}
                                width={30}
                                height={30}
                                className='h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-tertiary'
                            />
                        )}
                        {task.author && (
                            <Image
                                key={task.author.userid}
                                src={`/${task.author.profilePictureUrl}`}
                                alt={task.author.username}
                                width={30}
                                height={30}
                                className='h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-tertiary'
                            />
                        )}
                    </div>
                    <div className='flex items-center text-gray-500 dark:text-neutral-500'>
                        <button onClick={() => setShowComments(!showComments)}>
                            <MessageCircleMore size={20} className='cursor-pointer hover:text-gray-700 hover:bg-gray-200 dark:hover:text-gray-300 dark:hover:bg-dark-tertiary' />
                        </button>
                        <span className='ml-1 text-sm dark:text-neutral-400'>
                            {numberOfComments}
                        </span>
                    </div>
                </div>

                {/* Comments Section */}
                {showComments && (
                    <div className='mt-4 border-t border-gray-200 pt-4 dark:border-stroke-dark'>
                        <span className='text-sm font-semibold text-gray-900 dark:text-white mb-3 text-center'>Comments : </span>
                        {task.comments && task.comments.length > 0 ? (
                            task.comments.map((comment) => (
                                <div key={comment.id} className='mb-3 flex gap-3'>
                                    <Image
                                        src={`/${comment.user.profilePictureUrl}`}
                                        alt={comment.user.username}
                                        width={32}
                                        height={32}
                                        className='h-8 w-8 rounded-full object-cover'
                                    />
                                    <div>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-sm font-medium text-gray-900 dark:text-white'>
                                                {comment.user.username}
                                            </span>
                                        </div>
                                        <p className='mt-1 text-sm text-gray-600 dark:text-gray-300'>
                                            {comment.text}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='text-center text-sm text-gray-500 dark:text-gray-400'>
                                No comments yet!
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}