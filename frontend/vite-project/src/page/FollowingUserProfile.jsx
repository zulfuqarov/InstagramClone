import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ContextInsta } from '../Context/Context'
import { useParams } from 'react-router-dom'
const FollowingUserProfile = () => {
    const { userName } = useParams()
    const context = useContext(ContextInsta)


    const [userProfile, setuserProfile] = useState()
    const [userProfilePost, setuserProfilePost] = useState()
    const getUserProfile = async () => {
        try {
            const resProfile = await axios.get(`${context.REACT_APP_BACKEND_HOST}/user/ProfileUser?username=${userName}`)
            console.log(resProfile.data)
            setuserProfile(resProfile.data)
            const resPost = await axios.get(`${context.REACT_APP_BACKEND_HOST}/post/GetPost/${resProfile.data._id}`)
            console.log(resPost.data)
            setuserProfilePost(resPost.data)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getUserProfile()
    }, [])

    return (
        <div className='mx-auto container'>
            <section className='pb-[60px] w-full flex justify-center flex-col items-center'>
                {
                    userProfile &&
                    <section className='flex justify-between w-[700px] items-center pt-[50px]'>
                        <div className='w-[150px] h-[150px] '>
                            <img className='w-full h-full rounded-[50%] object-cover' src={`${userProfile.profilePicture}`} alt="" />
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex justify-between w-[400px]'>
                                <p className='text-[19px] text-gray-700 '>{userProfile.fullName}</p>
                            </div>
                            <div className='flex justify-between w-[400px] pt-[30px]'>
                                <p className='text-[17px] text-gray-700 '><span className='text-black text-[19px] pr-[8px] font-bold'>{userProfilePost && userProfilePost.length}</span> Posts</p>
                                <p className='text-[17px] text-gray-700 '><span className='text-black text-[19px] pr-[8px] font-bold'>{userProfile.followers.length}</span> Followers</p>
                                <p className='text-[17px] text-gray-700 '><span className='text-black text-[19px] pr-[8px] font-bold'>{userProfile.followings.length}</span>Following</p>
                            </div>
                            <div className='pt-[30px]'>
                                <p className='text-[17px] text-gray-700 '>{userProfile.bio}</p>
                            </div>
                        </div>
                    </section>
                }
                {
                    userProfilePost &&
                    <div className='pt-[100px] '>
                        <div>
                            <p className='text-center text-[22px] border-b-[2px] pb-[5px]'><i className="fa-solid fa-signs-post pr-[10px]"></i>Post</p>
                        </div>
                        <div className='grid grid-cols-3 gap-4 pt-[20px]'>
                            {
                                userProfilePost &&
                                userProfilePost.map((oneMap, index) => (
                                    <div key={index} className='relative group' /*onMouseEnter={() => context.getPostComments(oneMap._id)}*/>
                                        <img className='rounded-md w-[314px] h-[210px] object-cover' src={`${oneMap.img}`} alt="" />
                                        <div className='opacity-0 z-10  dden group-hover:opacity-40 transition-all absolute top-0 left-0 w-full h-full bg-slate-900 	'>

                                        </div>
                                        <div className='opacity-0 group-hover:opacity-100 transition-all   text-white z-20  absolute top-0 left-0 flex justify-center items-center w-full h-full'>
                                            <i className="fa-solid fa-heart "><span className='text-[14px] pl-[7px] inline-block'>{oneMap.likes.length}</span></i>
                                            <i className="fa-solid fa-comment pl-[20px]"><span className='text-[14px] pl-[7px] inline-block'>{oneMap.comments.length}</span></i>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            </section>
        </div>
    )
}

export default FollowingUserProfile