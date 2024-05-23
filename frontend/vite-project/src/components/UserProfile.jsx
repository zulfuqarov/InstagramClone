import React, { useContext, useEffect } from 'react'
import { ContextInsta } from '../Context/Context'

const UserProfile = () => {

    const context = useContext(ContextInsta)

    useEffect(() => {
        context.getUserProfile()
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
                    <div className='pt-[10px] '>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <div >
                                    <img className="h-8 w-8  rounded-full" src="https://picsum.photos/id/1027/150/150" />
                                </div>
                                <div className='pl-[20px] text-gray-600 text-[15px]'>
                                    <p>zulfuqarov</p>
                                    <small>Azerbaijan Bakue</small>
                                </div>
                            </div>
                            <div>
                                <button className='text-[13px] text-blue-500'>Follow</button>
                            </div>
                        </div>
                    </div>
                    <div className='pt-[10px] '>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <div >
                                    <img className="h-8 w-8  rounded-full" src="https://picsum.photos/id/1027/150/150" />
                                </div>
                                <div className='pl-[20px] text-gray-600 text-[15px]'>
                                    <p>zulfuqarov</p>
                                    <small>Azerbaijan Bakue</small>
                                </div>
                            </div>
                            <div>
                                <button className='text-[13px] text-blue-500'>Follow</button>
                            </div>
                        </div>
                    </div>
                    <div className='pt-[10px] '>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <div >
                                    <img className="h-8 w-8  rounded-full" src="https://picsum.photos/id/1027/150/150" />
                                </div>
                                <div className='pl-[20px] text-gray-600 text-[15px]'>
                                    <p>zulfuqarov</p>
                                    <small>Azerbaijan Bakue</small>
                                </div>
                            </div>
                            <div>
                                <button className='text-[13px] text-blue-500'>Follow</button>
                            </div>
                        </div>
                    </div>
                    <div className='pt-[10px] '>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <div >
                                    <img className="h-8 w-8  rounded-full" src="https://picsum.photos/id/1027/150/150" />
                                </div>
                                <div className='pl-[20px] text-gray-600 text-[15px]'>
                                    <p>zulfuqarov</p>
                                    <small>Azerbaijan Bakue</small>
                                </div>
                            </div>
                            <div>
                                <button className='text-[13px] text-blue-500'>Follow</button>
                            </div>
                        </div>
                    </div>
                    <div className='pt-[10px] '>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <div >
                                    <img className="h-8 w-8  rounded-full" src="https://picsum.photos/id/1027/150/150" />
                                </div>
                                <div className='pl-[20px] text-gray-600 text-[15px]'>
                                    <p>zulfuqarov</p>
                                    <small>Azerbaijan Bakue</small>
                                </div>
                            </div>
                            <div>
                                <button className='text-[13px] text-blue-500'>Follow</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default UserProfile