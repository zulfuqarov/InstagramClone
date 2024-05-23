import React, { useContext, useEffect } from 'react'
import { ContextInsta } from '../Context/Context'

const ProfileHeader = () => {
    const context = useContext(ContextInsta)

    useEffect(() => {
        context.getUserProfile()
    }, [])

    return (

        context.userProfile && <section  className='flex justify-between w-[700px] items-center pt-[50px]'>
            <div className='w-[150px] h-[150px] '>
                <img className='w-full h-full rounded-[50%] object-cover' src={`${context.userProfile.profilePicture}`} alt="" />
            </div>
            <div className='flex flex-col'>
                <div className='flex justify-between w-[400px]'>
                    <p className='text-[19px] text-gray-700 '>{context.userProfile.fullName}</p>
                    <button className='text-[19px] text-gray-700 bg-gray-200 px-[10px] py-[2px] rounded-lg hover:bg-slate-100 hover:text-black transition-all'>Edit profile</button>
                    <button className='text-[19px] text-gray-700  hover:text-black transition-all'><i class="fa-solid fa-gear"></i></button>
                </div>
                <div className='flex justify-between w-[400px] pt-[30px]'>
                    <p className='text-[17px] text-gray-700 '><span className='text-black text-[19px] pr-[8px] font-bold'>{context.userPost.length}</span> Posts</p>
                    <p className='text-[17px] text-gray-700 '><span className='text-black text-[19px] pr-[8px] font-bold'>{context.userProfile.followers.length}</span> Followers</p>
                    <p className='text-[17px] text-gray-700 '><span className='text-black text-[19px] pr-[8px] font-bold'>{context.userProfile.followings.length}</span>Following</p>
                </div>
                <div className='pt-[30px]'>
                    <p className='text-[17px] text-gray-700 '>{context.userProfile.bio}</p>
                </div>
            </div>
        </section>

    )
}

export default ProfileHeader