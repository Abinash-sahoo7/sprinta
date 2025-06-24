import { useCreateProjectMutation } from '@/app/state/api';
import Model from '@/components/Model';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import React, { useState, useEffect } from 'react'

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

const ModelNewProject = ({ isOpen, onClose }: Props) => {

    const [createProject, { isLoading }] = useCreateProjectMutation();

    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [openToast, setOpenToast] = useState(false);

    // Reset form fields when modal opens
    useEffect(() => {
        if (isOpen) {
            setProjectName('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setOpenToast(false);
        }
    }, [isOpen]);


    const handleSubmit = async () => {
        if (!projectName || !startDate || !endDate) return;

        try {
            await createProject({
                name: projectName,
                description,
                startDate,
                endDate
            });
            setOpenToast(true);
            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            console.log('error occure while Create Project : ', error);
            setOpenToast(true);
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
        return projectName && startDate && endDate && description;
    }

    const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-md dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus-outline"

    return (
        <Model isOpen={isOpen} onClose={onClose} name='New project'>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }} className='mt-4 space-y-6'>

                <input
                    type='text'
                    placeholder='project Name'
                    className={inputStyles}
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />

                <textarea
                    placeholder='project Description'
                    className={inputStyles}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <button type='submit' className={`mt-4 w-full flex justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2 ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!isFormValid() || isLoading}
                >
                    {isLoading ? 'Creating...' : 'Create Project'}
                </button>
                <Snackbar
                    open={openToast}
                    autoHideDuration={5000}
                    onClose={handleToastClose}
                    message="Project created Successfully."
                />
            </form>
        </Model>
    )
}

export default ModelNewProject