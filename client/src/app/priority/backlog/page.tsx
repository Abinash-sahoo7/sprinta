import React from 'react'
import ReuseablePriorityPage from '../reuseablePriorityPage/page'
import { Priority } from '@/app/types'



const BacklogPriorityPage = () => {
    return (
        <ReuseablePriorityPage priority={Priority.Backlog} />
    )
}

export default BacklogPriorityPage