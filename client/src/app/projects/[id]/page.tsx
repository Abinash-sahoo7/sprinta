'use client'

import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader'
import Board from '../BoardView'
import List from '../ListView'
import TimeLine from '../TimeLineView'
import TableView from '../TableView'
import ModelNewTask from '@/components/ModelNewTask'

type Props = {
    params: Promise<{ id: string }>;
}

const Project = ({ params }: Props) => {
    const unwrappedParams = React.use(params);
    const { id } = unwrappedParams;

    const [activeTab, setActiveTab] = useState("Board");
    const [isModelNewTaskOpen, setIsModelNewTaskOpen] = useState(false);


    return (
        <div className=''>
            {/* Model New Task */}

            <ModelNewTask
                isOpen={isModelNewTaskOpen}
                onClose={() => setIsModelNewTaskOpen(false)}
                projectId={id}
            />

            <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "Board" && (
                <Board id={id} setIsModelNewTaskOpen={setIsModelNewTaskOpen} />
            )}

            {activeTab === "List" && (
                <List id={id} setIsModelNewTaskOpen={setIsModelNewTaskOpen} />
            )}

            {activeTab === "Timeline" && (
                <TimeLine id={id} setIsModelNewTaskOpen={setIsModelNewTaskOpen} />
            )}

            {activeTab === "Table" && (
                <TableView id={id} setIsModelNewTaskOpen={setIsModelNewTaskOpen} />
            )}

        </div>
    )
}

export default Project