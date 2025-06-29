import { User } from '@/app/types'
import Image from 'next/image';
import React from 'react'

type Props = {
    user: User;
}

const UserCard = ({ user }: Props) => {
    return (
        <div className='flex items-center rounded border p-4 shadow dark:bg-gray-800 dark:border-gray-700'>
            {
                user.profilePictureUrl && (
                    <Image
                        src={`https://sprinta-s3-images.s3.us-east-1.amazonaws.com/p1.png`}
                        alt={user.username}
                        width={50}
                        height={50}
                        className='rounded-full'
                    />
                )
            }
            <div>
                <h3 className='dark:text-white'>{user.username}</h3>
                <p className='dark:text-gray-300'>{user.email}</p>
            </div>
        </div>
    )
}

export default UserCard