import React from 'react'
import ReuseablePriorityPage from '../reuseablePriorityPage/page'
import { Priority } from '@/app/types'



const MediumPriorityPage = () => {
    return (
        <ReuseablePriorityPage priority={Priority.Medium} />
    )
}

export default MediumPriorityPage