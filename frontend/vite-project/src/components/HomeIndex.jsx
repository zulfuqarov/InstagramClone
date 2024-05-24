import React, { useEffect, useContext } from 'react'
import UserProfile from './UserProfile'
import { ContextInsta } from '../Context/Context'
const HomeIndex = () => {

    const context = useContext(ContextInsta)

    useEffect(() => {
        context.getFollowingPost()
    }, [])

    return (
        <div className='flex w-full justify-evenly'>
            <div className='w-[50%]'>
                {
                    context.followingPost &&
                    context.followingPost.map((oneMap, index) => (
                        <div key={index} className="bg-white p-4">
                            <div className="bg-white border rounded-sm max-w-md">
                                <div className="flex justify-between items-center">
                                    <div className='flex items-center px-4 py-3'>
                                        <img className="h-8 w-8 rounded-full" src="https://picsum.photos/id/1027/150/150" />
                                        <div className="ml-3 ">
                                            <span className="text-sm font-semibold antialiased block leading-tight">{oneMap.fullName}</span>
                                            <span className="text-gray-600 text-xs block">{oneMap.bio}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-ellipsis text-[19px] pr-[10px] cursor-pointer"></i>
                                    </div>
                                </div>
                                <img className='object-cover w-[446px] h-[446px]' src={`${oneMap.img}`} />
                                <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                                    <div className="flex gap-5">
                                        <i className="fa-regular fa-heart text-[22px] cursor-pointer"></i>
                                        <i className="fa-regular fa-comment text-[22px] cursor-pointer"></i>
                                        <i className="fa-solid fa-share text-[22px] cursor-pointer"></i>
                                    </div>
                                    <div className="flex">
                                        <i className="fa-regular fa-bookmark text-[22px] cursor-pointer"></i>
                                    </div>
                                </div>
                                {/* <div className="font-semibold text-sm mx-4 mt-2 mb-4">{oneMap.likes.length}</div> */}
                                <div className='border-[1px] border-gray-200 px-[10px] py-[10px] flex flex-col rounded-lg m-[10px]'>
                                    <div className='flex  items-center'>
                                        <div>
                                            <img className="h-8 w-8 rounded-full" src="https://picsum.photos/id/1027/150/150" />
                                        </div>
                                        <div className='pl-[10px]'>
                                            name
                                        </div>
                                    </div>
                                    <div className='pl-[30px] mx-auto'>
                                        comments
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='w-[20%]'>
                <UserProfile />
            </div>
        </div>
    )
}

export default HomeIndex