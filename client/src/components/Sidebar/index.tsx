'use client'

import { useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/app/state';
import { useGetAuthUserQuery, useGetProjectsQuery } from '@/app/state/api';
import { signOut } from 'aws-amplify/auth';
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, Search, ShieldAlert, User, Users, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';


const Sidebar = () => {

    const [showProjects, setShowProjects] = useState(true);
    const [showPriority, setShowPriority] = useState(true);

    const { data: projects, error, isLoading } = useGetProjectsQuery();
    // console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    // console.log("Projects data:", projects);
    // console.log("Error:", error);
    // console.log("Loading:", isLoading);

    const dispatch = useDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

    const { data: currentUser } = useGetAuthUserQuery({});
    console.log(currentUser);

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error: any) {
            console.log('Error while sign out the user : ', error);
        }
    }

    if (!currentUser) return null;
    const currentUserDetails = currentUser?.userDetails;

    const sidebarClassNames = `fixed flex flex-col h-screen shadow-xl transition-all duration-300 z-40 dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

    return (
        <div className={sidebarClassNames}>
            <div className='flex flex-col h-full'>
                {/* logo */}
                <div className='z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black'>
                    <div className='text-xl font-bold text-gray-800 dark:text-white'>
                        <Link href='/'>
                            SPRINTA
                        </Link>
                    </div>
                    {isSidebarCollapsed ? null : (
                        <button className='py-3' onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
                            <X className='h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white'></X>
                        </button>
                    )}
                </div>
                {/* Team */}
                <div className='flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700'>
                    <Image src='https://sprinta-s3-images.s3.us-east-1.amazonaws.com/logo.png' alt='Logo' width={40} height={40} />
                    <div className=''>
                        <h3 className='text-md font-bold tracking-tight dark:text-gray-400'>
                            SPRINTA TEAM
                        </h3>
                        <div className='flex items-start gap-2 mt-1'>
                            <LockIcon className='w-3 h-3 mt-[0.1rem] text-gray-500 dark:text-gray-400' />
                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                                Private
                            </p>
                        </div>
                    </div>
                </div>
                {/* Side bar Links/ */}
                <div className='w-full z-10'>
                    <SidBarLinks href='/' icon={Home} label='Home' />
                    <SidBarLinks href='/timeline' icon={Briefcase} label='Timeline  ' />
                    <SidBarLinks href='/search' icon={Search} label='Search' />
                    <SidBarLinks href='/users' icon={User} label='Users' />
                    <SidBarLinks href='/teams' icon={Users} label='Teams' />
                </div>

                <div className='w-full z-10'>
                    {/* show projects */}
                    <button
                        className='flex w-full items-center justify-between px-8 py-3 text-gray-500'
                        onClick={() => setShowProjects((prev) => !prev)}
                    >
                        <span className=''>
                            Projects
                        </span>
                        {showProjects ? (<ChevronUp className='h-5 w-5' />) : (<ChevronDown className='h-5 w-5' />)}
                    </button>

                    {/* List Project */}
                    {showProjects && projects?.map((project) => (
                        <SidBarLinks key={project.id} href={`/projects/${project.id}`} icon={Briefcase} label={project.name} />
                    ))}
                </div>

                <div className='w-full z-10'>
                    {/* show priority */}
                    <button
                        className='flex w-full items-center justify-between px-8 py-3 text-gray-500'
                        onClick={() => setShowPriority((prev) => !prev)}
                    >
                        <span className=''>
                            Priority
                        </span>
                        {showPriority ? (<ChevronUp className='h-5 w-5' />) : (<ChevronDown className='h-5 w-5' />)}
                    </button>

                    {showPriority && (
                        <>
                            <SidBarLinks href='/priority/urgent' icon={AlertCircle} label='Urgent' />
                            <SidBarLinks href='/priority/high' icon={ShieldAlert} label='High' />
                            <SidBarLinks href='/priority/medium' icon={AlertTriangle} label='Medium' />
                            <SidBarLinks href='/priority/low' icon={AlertOctagon} label='Low' />
                            <SidBarLinks href='/priority/backlog' icon={Layers3} label='Backlog' />
                        </>
                    )}
                </div>

                <div className='flex-grow'></div>

                <div className='z-10 w-full bg-white px-4 py-4 dark:bg-black md:hidden'>
                    <div className='flex w-full items-center justify-between'>
                        <div className='align-center flex justify-center h-9 w-9 hover:bg-gray-100'>
                            {!!currentUserDetails?.profilePictureUrl ? (
                                <Image
                                    src={`https://sprinta-s3-images.s3.us-east-1.amazonaws.com/${currentUserDetails.profilePictureUrl}`}
                                    alt={currentUserDetails.username}
                                    width={100}
                                    height={50}
                                    className='h-full rounded-full object-cover'
                                />
                            ) : (
                                <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
                            )}
                        </div>
                        <span className='mx-3 text-gray-800 dark:text-white'>
                            {currentUserDetails?.username}
                        </span>
                        <button
                            className='bg-blue-400 rounded px-4 py-2 text-xs font-bold text-white hover:bg-blue-500'
                            onClick={handleSignOut}
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

interface SidebarLinksProps {
    href: string,
    icon: LucideIcon,
    label: string,
}

const SidBarLinks = ({ href, icon: Icon, label }: SidebarLinksProps) => {

    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href} className='w-full'>
            <div className={`relative flex cursor-pointer items-center gap-3 transition-all hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-700" : ""} justify-start px-8 py-3`}>
                {isActive && (
                    <div className='absolute left-0 top-0 h-full w-[5px] bg-blue-200'></div>
                )}
                <Icon className='h-6 w-6 text-gray-800 dark:text-gray-100' />
                <span className={`font-medium text-gray-800 dark:text-gray-100`}>
                    {label}
                </span>
            </div>
        </Link>
    )
}


export default Sidebar