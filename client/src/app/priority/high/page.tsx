import React from 'react'

import { Priority } from '@/app/types'
import ReuseablePriorityPage from '../reuseablePriorityPage/page'



const HighPriorityPage = () => {
    return (
        <ReuseablePriorityPage priority={Priority.High} />
    )
}

export default HighPriorityPage