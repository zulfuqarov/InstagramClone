import React, { useContext, useEffect } from 'react'
import { ContextInsta } from '../Context/Context'

const UserProfile = () => {

    const context = useContext(ContextInsta)

    useEffect(() => {
        context.getUserProfile()
        context.getAllUserProfile()
    }, [])


    if (context.userProfile) {
        return (
            <div className='pt-[60px] fixed w-[235px]'>
                {
                    context.userProfile &&
                    <div className='flex items-center justify-between pb-[15px]'>
                        <div className='flex items-center'>
                            <div >
                                <img className="h-8 w-8 object-cover  rounded-full" src={`${context.userProfile.profilePicture}`} />
                            </div>
                            <div className='pl-[20px] text-gray-600 text-[15px]'>
                                <p>{context.userProfile.fullName}</p>
                                <small>{context.userProfile.bio}</small>
                            </div>
                        </div>
                        <div>
                            <button className='text-[13px] text-blue-500'>Sigin Out</button>
                        </div>
                    </div>
                }


                <div className='pt-[20px] border-t-[1px] border-gray-300'>
                    <div className='flex items-center justify-between w-full'>
                        <p className='text-[15px] text-gray-400'>Suggestions for you</p>
                        <p className='text-[15px] text-gray-600 cursor-pointer'>See All</p>
                    </div>
                    {
                        context.allUserProfile &&

                        context.allUserProfile.filter(oneFilter => oneFilter._id !== context.user).map((oneMap, index) => (
                            <div key={index} className='pt-[10px] '>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <div >
                                            <img className="h-8 w-8 object-cover rounded-full" src={`${oneMap.profilePicture}`} />
                                        </div>
                                        <div className='pl-[20px] text-gray-600 text-[15px]'>
                                            <p>{oneMap.fullName}</p>
                                            <small>{oneMap.bio}</small>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            context.userProfile.followings.includes(oneMap._id) ?
                                                <button onClick={() => context.getUnfollow(oneMap._id)} className='text-[13px] text-blue-500'>Unfollow</button>
                                                :
                                                <button onClick={() => context.getFollow(oneMap._id)} className='text-[13px] text-blue-500'>Follow</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))

                    }
                </div>
            </div>
        )
    }
}


export default UserProfile