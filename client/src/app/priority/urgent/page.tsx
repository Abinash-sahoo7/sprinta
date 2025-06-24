import React from 'react'
import ReuseablePriorityPage from '../reuseablePriorityPage/page'
import { Priority } from '@/app/types'



const UrgentPriorityPage = () => {
    return (
        <ReuseablePriorityPage priority={Priority.Urgent} />
    )
}

export default UrgentPriorityPage