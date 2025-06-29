"use client"

import React from 'react'
import { useGetUsersQuery } from '../state/api'
import { useAppSelector } from '../redux';
import Header from '@/components/Header';
import {
    DataGrid,
    Toolbar,
    ExportCsv,
    ExportPrint,
    ToolbarButton,
    GridColDef,
    FilterPanelTrigger,
} from '@mui/x-data-grid';
import Image from 'next/image';
import { dataGridClassNames, dataGridSxStyles } from '../lib/utils';
import Tooltip from '@mui/material/Tooltip';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';
import FilterListIcon from '@mui/icons-material/FilterList';

// const CustomToolbar = () => (
//     <Toolbar className="toolbar flex gap-2">
//         <QuickFilter />
//         <ExportPrint />
//     </Toolbar>
// )

function CustomToolbar() {
    return (
        <Toolbar className="toolbar flex gap-2">
            <Tooltip title="Download as CSV">
                <ExportCsv render={<ToolbarButton />}>
                    <FileDownloadIcon fontSize="small" />
                </ExportCsv>
            </Tooltip>
            <Tooltip title="Print">
                <ExportPrint render={<ToolbarButton />}>
                    <PrintIcon fontSize="small" />
                </ExportPrint>
            </Tooltip>
            <Tooltip title="Filters">
                <FilterPanelTrigger render={<ToolbarButton />}>
                    <FilterListIcon fontSize="small" />
                </FilterPanelTrigger>
            </Tooltip>
        </Toolbar>
    );
}

const columns: GridColDef[] = [
    {
        field: "userId",
        headerName: "ID",
        width: 100,
    },
    {
        field: "username",
        headerName: "UserName",
        width: 150,
    },
    {
        field: "profilePictureUrl",
        headerName: "Profile Picture",
        width: 100,
        renderCell: (params) => (
            <div className='flex items-center w-full h-full justify-center'>
                <div className='h-9 w-9'>
                    <Image
                        src={`/${params.value}`}
                        alt={params.row.username}
                        width={100}
                        height={50}
                        className='h-full rounded-full object-cover'
                    />
                </div>
            </div>
        )
    },
]

const UsersPage = () => {

    const { data: users, isLoading, isError } = useGetUsersQuery();
    const isDarkMode = useAppSelector(state => state.global.isDarkMode);

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error Fecthing Users</div>

    return (
        <div className='flex w-full flex-col p-8'>
            <Header name="Users" />
            <div style={{ height: 650, width: "100%" }}>
                <DataGrid
                    rows={users || []}
                    columns={columns}
                    getRowId={(row) => row.userId}
                    pagination
                    className={dataGridClassNames}
                    sx={dataGridSxStyles(isDarkMode)}
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    showToolbar
                // showToolbar={true}
                />
            </div>
        </div>
    )
}

export default UsersPage