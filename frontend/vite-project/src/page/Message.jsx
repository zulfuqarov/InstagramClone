import React from 'react'
import LeftMessage from '../components/LeftMessage'
import RightMessage from '../components/RightMessage'

const Message = () => {
    return (
        <div class="flex flex-row h-screen antialiased text-gray-800">
            <LeftMessage />
            <RightMessage />
        </div>
    )
}

export default Message