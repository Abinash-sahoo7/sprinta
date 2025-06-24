'use client'

import React, { useEffect, useState } from 'react'
import { useSearchQuery } from '../state/api';
import { debounce } from 'lodash';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import ProjectCard from '@/components/ProjectCard';
import UserCard from '@/components/UserCard';

const Search = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const { data: searchResults, isLoading, error } = useSearchQuery(searchTerm, { skip: searchTerm.length < 3 });


    const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, 500);

    useEffect(() => {
        return handleSearch.cancel;
    }, [handleSearch.cancel]);

    return (
        <div className='p-8'>
            <Header name='Search' />
            <div>
                <input
                    type='text'
                    placeholder='Search...'
                    className='w-1/2 rounded border p-3 shadow dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400'
                    onChange={handleSearch}
                />
            </div>
            <div className='p-5'>
                {isLoading && <p className='dark:text-gray-300'>Loading</p>}
                {error && <p className='dark:text-red-400'>Error ocuured while fecting search result.</p>}
                {
                    !isLoading && !error && searchResults && (
                        <div>
                            {searchResults.tasks && searchResults.tasks.length > 0 && (
                                <h2 className='text-lg font-medium mb-2 dark:text-white'>Tasks</h2>
                            )}
                            {searchResults.tasks?.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}

                            {searchResults.projects && searchResults.projects.length > 0 && (
                                <h2 className='text-lg font-medium mb-2 dark:text-white'>Projects</h2>
                            )}
                            {searchResults.projects?.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}

                            {searchResults.users && searchResults.users.length > 0 && (
                                <h2 className='text-lg font-medium mb-2 dark:text-white'>Users</h2>
                            )}
                            {searchResults.users?.map((user) => (
                                <UserCard key={user.userid} user={user} />
                            ))}

                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Search


