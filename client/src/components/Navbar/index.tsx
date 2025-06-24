import React from 'react'
import { Home, LucideIcon } from 'lucide-react';
import { IconNode, Menu, Moon, Search, Settings, Sun } from 'lucide-react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSidebarCollapsed } from '@/app/state'
import { usePathname } from 'next/navigation'

const Navbar = () => {

    const dispatch = useDispatch();
    const isSidebarcollasped = useAppSelector((state) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);



    return (
        <div className='flex items-center justify-between bg-white dark:bg-black py-3 px-4'>
            {/* search bar */}
            <div className='flex items-center gap-8'>
                {!isSidebarcollasped ? null : (
                    <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarcollasped))}>
                        <Menu className='h-8 w-8 dark:text-white' />
                    </button>
                )}
                <div className='relative flex h-min w-[200px] items-center'>
                    <Search className='absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-gray-500 dark:text-white dark:hover:text-gray-400' />
                    <input className='w-full rounded border-none bg-gray-100 p-2 pl-10 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-white dark:placeholder-white' type='search' placeholder='Search...' />
                </div>
            </div>

            {/* Icons */}
            <div className='flex items-center'>
                <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
                    className={isDarkMode ? `rounded p-2 dark:hover:bg-gray-700` : `rounded p-2 hover:bg-gray-100`}
                >
                    {isDarkMode ? (<Sun className='h-6 w-6 cursor-pointer text-yellow-500' />)
                        : (<Moon className='h-6 w-6 cursor-pointer text-gray-500 dark:text-white' />)}
                </button>
                <Link
                    href="/settings"
                    className='h-min w-min rounded p-2 hover:bg-gray-100'
                >
                    <Settings className='h-6 w-6 cursor-pointer text-gray-500 dark:text-white' />
                </Link>
                <div className='ml-2 mr-5 hidden min-h-[2em] w-[0.1em] bg-gray-200 dark:bg-gray-800 md:inline-block'></div>
            </div>


        </div>
    )
}





export default Navbar