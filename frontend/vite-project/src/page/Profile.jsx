import React from 'react'
import ProfileHeader from '../components/ProfileHeader'
import Post from '../components/Post'

const Profile = () => {
    return (
        <div className='pb-[60px]'>
            <ProfileHeader />
            <Post />
        </div>
    )
}

export default Profile