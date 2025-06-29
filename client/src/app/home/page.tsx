'use client'
import React, { useState } from 'react'
import { useGetProjectsQuery, useGetTasksQuery } from '../state/api'
import { useAppSelector } from '../redux';
import { Priority, Project, Task } from '../types';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Header from '@/components/Header/index';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { dataGridClassNames, dataGridSxStyles } from '../lib/utils';


const taskColumn: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
    { field: "dueDate", headerName: "Due Date", width: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    // Fetch all projects for dropdown
    const { data: allProjects, isLoading: allProjectsLoading } = useGetProjectsQuery();

    // Fetch tasks for selected project
    const { data: projectTasks, isLoading: taskLoading, isError: taskError } = useGetTasksQuery(
        selectedProjectId ? parseInt(selectedProjectId) : parseInt("1")
    );

    // console.log("tasks : ", tasks);

    const { data: projects, isLoading: projectLoading } = useGetProjectsQuery();
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    if (taskLoading || projectLoading || allProjectsLoading) return <div>Loading...</div>
    if (taskError || !projectTasks || !projects) return <div>Error Fetching Data</div>

    // Calculate priority count using project tasks
    const priorityCount = projectTasks?.reduce((acc: Record<string, number>, task: Task) => {
        const { priority } = task;
        acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
        return acc;
    }, {} as Record<string, number>) || {};

    // Create task distribution data for bar chart
    const taskDistribution = Object.keys(priorityCount).map((key) => ({
        name: key,
        count: priorityCount[key],
    }));

    // Calculate project status count using all projects
    const statusCount = allProjects?.reduce((acc: Record<string, number>, project: Project) => {
        const status = project.endDate ? "Completed" : "Active";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>) || {};

    // Create status data for pie chart
    const statusData = Object.keys(statusCount).map((key) => ({
        name: key,
        count: statusCount[key],
    }));
    // console.log("projectStatus ", projectStatus);

    const chartColors = isDarkMode ?
        {
            bar: "#8884d8",
            barGrid: "#303030",
            pieFill: "#4A90E2",
            text: "#FFFFFF"
        } :
        {
            bar: "#8884d8",
            barGrid: "#E0E0E0",
            pieFill: "#82ca9d",
            text: "#000000"
        };

    return (
        <div className='container w-[100%] h-full p-8 bg-gray-100 bg-transparent'>
            <Header
                name="Project Management Dashboard"
                allProjects={allProjects}
                selectedProjectId={selectedProjectId}
                onProjectSelect={setSelectedProjectId}
            />
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='rounded-lg bg-white p-4 shadow dark:bg-dark-secondary'>
                    <h3 className='mb-4 text-lg font-semibold dark:text-white'>
                        Task Priority Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={taskDistribution}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={chartColors.barGrid}
                            />
                            <XAxis dataKey="name" stroke={chartColors.text} />
                            <YAxis stroke={chartColors.text} />
                            <Tooltip
                                contentStyle={{
                                    width: "min-content",
                                    height: "min-content"
                                }}
                            />
                            <Legend />
                            <Bar dataKey="count" fill={chartColors.bar} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className='rounded-lg bg-white p-4 shadow dark:bg-dark-secondary'>
                    <h3 className='mb-4 text-lg font-semibold dark:text-white'>
                        Project Status
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie dataKey="count" data={statusData} label fill='#82ca9d' stroke='#82ca9d'>
                                {statusData.map((entry: any, index: number) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className='rounded-lg bg-white p-4 shadow dark:bg-dark-secondary'>
                    <h3 className='mb-4 text-lg font-semibold dark:text-white'>
                        Tasks
                    </h3>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={projectTasks}
                            columns={taskColumn}
                            checkboxSelection
                            className={dataGridClassNames}
                            sx={dataGridSxStyles(isDarkMode)}
                            loading={taskLoading}
                            getRowClassName={() => 'data-grid-row'}
                            getCellClassName={() => 'data-grid-cell'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage