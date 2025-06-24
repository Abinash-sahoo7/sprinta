import { useCreateTaskMutation } from '@/app/state/api';
import { Priority, Status } from '@/app/types';
import Model from '@/components/Model';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { addDays } from 'date-fns';
import React, { useState, useEffect } from 'react'

type Props = {
    isOpen: boolean;
    onClose: () => void;
    id?: string | null;
}

const ModelNewTask = ({ isOpen, onClose, id = null }: Props) => {

    const [createTask, { isLoading }] = useCreateTaskMutation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<Status>(Status.toDo);
    const [priority, setPriority] = useState<Priority>(Priority.Low);
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [authorUserId, setAuthorUserId] = useState('');
    const [assignedUserId, setAssignedUserId] = useState('');
    const [tags, setTags] = useState('');
    const [projectId, setProjectId] = useState('');

    const [openToast, setOpenToast] = useState(false);


    // Reset form fields when modal opens
    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setDescription('');
            setStartDate('');
            setDueDate('');
            setStatus(Status.toDo);
            setPriority(Priority.Low);
            setAuthorUserId('');
            setAssignedUserId('');
            setTags('');
        }
        if (setOpenToast) {
            setOpenToast(false);
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (!title || !authorUserId || !(id !== null || projectId)) return;

        try {
            await createTask({
                title,
                description,
                status,
                priority,
                startDate: startDate ? new Date(startDate).toISOString() : new Date().toISOString(),
                dueDate: dueDate ? new Date(dueDate).toISOString() : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                authorUserId: Number(authorUserId),
                assignedUserId: Number(assignedUserId),
                tags: tags,
                projectId: id !== null ? Number(id) : Number(projectId)
            });
            setOpenToast(true);
            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            console.log('error occurred while creating task: ', error);
            setOpenToast(true); // Show toast for error
        }

    }

    const handleToastClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    };

    const isFormValid = () => {
        return title && authorUserId && !(id !== null || projectId);
    }

    const selectStyles = "mb-4 block w-full border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:text-white dark:focus-outline"

    const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-md dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus-outline"

    return (
        <Model isOpen={isOpen} onClose={onClose} name='Create New Task'>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }} className='mt-4 space-y-6'>

                <input
                    type='text'
                    placeholder='Title'
                    className={inputStyles}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder='project Description'
                    className={inputStyles}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2'>
                    <select
                        className={selectStyles}
                        value={status}
                        onChange={(e) => setStatus(Status[e.target.value as keyof typeof Status])}
                    >
                        <option value="">Selecet Status</option>
                        <option value={Status.toDo}>To Do</option>
                        <option value={Status.Complete}>Complete</option>
                        <option value={Status.underReview}>Under Review</option>
                        <option value={Status.workInProgress}>Work In Progress</option>
                    </select>
                    <select
                        className={selectStyles}
                        value={priority}
                        onChange={(e) => setPriority(Priority[e.target.value as keyof typeof Priority])}
                    >
                        <option value="">Selecet Priority</option>
                        <option value={Priority.Backlog}>Backlog</option>
                        <option value={Priority.High}>High</option>
                        <option value={Priority.Low}>Low</option>
                        <option value={Priority.Medium}>Medium</option>
                        <option value={Priority.Urgent}>Urgent</option>
                    </select>
                </div>

                <input
                    type='text'
                    placeholder='Tags (Comma Separated)'
                    className={inputStyles}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2'>
                    <input
                        type='date'
                        placeholder='Start Date'
                        className={inputStyles}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    <input
                        type='date'
                        placeholder='End Date'
                        className={inputStyles}
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                <input
                    type='text'
                    placeholder='Author User Id'
                    className={inputStyles}
                    value={authorUserId}
                    onChange={(e) => setAuthorUserId(e.target.value)}
                />

                <input
                    type='text'
                    placeholder='Assigned User Id'
                    className={inputStyles}
                    value={assignedUserId}
                    onChange={(e) => setAssignedUserId(e.target.value)}
                />
                {
                    id === null && (
                        <input
                            type='text'
                            placeholder='Project ID'
                            className={inputStyles}
                            value={projectId}
                            onChange={(e) => setProjectId(e.target.value)}
                        />
                    )
                }

                <button type='submit' className={`mt-4 w-full flex justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2 ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!isFormValid() || isLoading}
                >
                    {isLoading ? 'Creating...' : 'Create Project'}
                </button>
                <Snackbar
                    open={openToast}
                    autoHideDuration={5000}
                    onClose={handleToastClose}
                    message="Task Created Successfully."
                />
            </form>
        </Model>
    )
}

export default ModelNewTask


