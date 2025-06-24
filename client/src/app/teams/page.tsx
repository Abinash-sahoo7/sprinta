"use client"

import React from 'react'
import { useGetTeamsQuery } from '../state/api'
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
        field: "id",
        headerName: "Team ID",
        width: 100,
    },
    {
        field: "teamName",
        headerName: "Team Name",
        width: 200,
    },
    {
        field: "productOwnerUsername",
        headerName: "Product Owner",
        width: 200,
    },
    {
        field: "projectManagerUsername",
        headerName: "Project Manager",
        width: 200,
        // valueGetter: (params) => params.row.projectManager?.username,
    },
]

const Teams = () => {

    const { data: teams, isLoading, isError } = useGetTeamsQuery();
    const isDarkMode = useAppSelector(state => state.global.isDarkMode);
    console.log("teams : ", teams);
    if (isLoading) return <div>Loading...</div>
    if (isError || !teams) return <div>Error Fecthing Users</div>

    return (
        <div className='flex w-full flex-col p-8'>
            <Header name="Teams" />
            <div style={{ height: 650, width: "100%" }}>
                <DataGrid
                    rows={teams || []}
                    columns={columns}
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

export default Teams