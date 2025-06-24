import React from 'react'
import ReuseablePriorityPage from '../reuseablePriorityPage/page'
import { Priority } from '@/app/types'



const LowPriorityPage = () => {
    return (
        <ReuseablePriorityPage priority={Priority.Low} />
    )
}

export default LowPriorityPage