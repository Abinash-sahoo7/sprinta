import Header from '@/components/Header'
import React from 'react'

type Props = {}

const Settings = (props: Props) => {

    const userSetting = {
        username: 'John Doe',
        email: 'john.doe@example.com',
        teamName: 'Development Team',
        roleName: 'Developer',
    }

    const lableStyle = "block text-sm font-medium dark:text-white"
    const inputStyle = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white"

    return (
        <div className='p-8'>
            <Header name='Settings' />
            <div className='space-y-4'>
                <div>
                    <label className={lableStyle} >UserName</label>
                    <div className={inputStyle} >{userSetting.username}</div>
                </div>
                <div>
                    <label className={lableStyle} >Email</label>
                    <div className={inputStyle} >{userSetting.email}</div>
                </div>
                <div>
                    <label className={lableStyle} >Team</label>
                    <div className={inputStyle} >{userSetting.teamName}</div>
                </div>
                <div>
                    <label className={lableStyle} >Role</label>
                    <div className={inputStyle} >{userSetting.roleName}</div>
                </div>
            </div>
        </div>
    )
}

export default Settings