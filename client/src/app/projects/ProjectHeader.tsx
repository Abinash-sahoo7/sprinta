import Header from '@/components/Header';
import { Clock, Filter, Grid3X3, List, PlusSquare, Search, Share2, Table, Table2Icon } from 'lucide-react';
import React, { useState } from 'react'
import ModelNewProject from './ModelNewProject';

type Props = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {

    const [isModelNewProjectOpen, setIsModelNewProjectOpen] = useState(false);

    return (
        <div className='px-4 xl:px-6'>
            {/* Model New Project */}

            <ModelNewProject
                isOpen={isModelNewProjectOpen}
                onClose={() => setIsModelNewProjectOpen(false)}
            />

            <div className='pb-6 pt-6 mx-4 lg:pb-4 lg:pt-8'>
                <Header
                    name='Product Design Development'
                    buttonComponet={
                        <button className='flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600'
                            onClick={() => setIsModelNewProjectOpen(true)}
                        >
                            <PlusSquare className='h-5 w-5 mr-2' /> New Board
                        </button>
                    }
                />
            </div>
            {/* Tabs */}
            <div className='flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center md:justify-end'>
                <div className='flex flex-1 items-center gap-2 md:gap-4'>
                    <TabButton
                        name='Board'
                        icon={<Grid3X3 className='h-5 w-5' />}
                        setActiveTab={setActiveTab}
                        activeTab={activeTab}
                    />
                    <TabButton
                        name='List'
                        icon={<List className='h-5 w-5' />}
                        setActiveTab={setActiveTab}
                        activeTab={activeTab}
                    />
                    <TabButton
                        name='Timeline'
                        icon={<Clock className='h-5 w-5' />}
                        setActiveTab={setActiveTab}
                        activeTab={activeTab}
                    />
                    <TabButton
                        name='Table'
                        icon={<Table2Icon className='h-5 w-5' />}
                        setActiveTab={setActiveTab}
                        activeTab={activeTab}
                    />
                </div>
                <div className='flex items-center gap-2'>
                    <button className='text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover-text-gray-300'>
                        <Filter className='h-5 w-5' />
                    </button>
                    <button className='text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover-text-gray-300'>
                        <Share2 className='h-5 w-5' />
                    </button>
                    <div className='relative'>
                        <div className="flex items-center relative">
                            <input
                                type="text"
                                placeholder="Search task"
                                className="pl-8 pr-4 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                            <Grid3X3 className="h-4 w-4 absolute left-3 top-2 text-gray-500 dark:text-neutral-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectHeader


type TabButtonProps = {
    name: string;
    icon: React.ReactNode;
    setActiveTab: (tabName: string) => void;
    activeTab: string;
}

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
    const isActive = activeTab === name;
    return (
        <button className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:w-full after:h-[1px] hover:text-blue-500 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""}`}
            onClick={() => setActiveTab(name)}
        >
            {icon}
            {name}
        </button>
    )
}