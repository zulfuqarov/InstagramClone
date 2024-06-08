import React, { useEffect, useContext, useState } from 'react'
import UserProfile from './UserProfile'
import { ContextInsta } from '../Context/Context'
import { Link } from 'react-router-dom'
import axios from "axios";

const HomeIndex = () => {

    const context = useContext(ContextInsta)

    useEffect(() => {
        context.getFollowingPost()
    }, [])

    const [showComments, setshowComments] = useState()
    const ShowCommentAdd = (index) => {
        setshowComments(index)
    }

    const [inputComment, setinputComment] = useState('')
    const handleChangeinputComment = (e) => {
        setinputComment(e.target.value)
    }

    const handleSubmitComment = async (id) => {
        try {
            const res = await axios.post(`${context.REACT_APP_BACKEND_HOST}/postComment/`, {
                receiverId: id,
                content: inputComment
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex w-full justify-evenly relative'>
            <div className='w-[50%]'>
                {
                    context.followingPost &&
                    context.followingPost.map((oneMap, index) => (
                        <div key={index} className="bg-white p-4">
                            <div className="bg-white border rounded-sm max-w-md">
                                <Link to={`/${oneMap.fullName}`}>
                                    <div className="flex justify-between items-center">
                                        <div className='flex items-center px-4 py-3'>
                                            <img className="h-8 w-8 object-cover rounded-full" src={`${oneMap.profilePicture}`} />
                                            <div className="ml-3 ">
                                                <span className="text-sm font-semibold antialiased block leading-tight">{oneMap.fullName}</span>
                                                <span className="text-gray-600 text-xs block">{oneMap.bio}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-ellipsis text-[19px] pr-[10px] cursor-pointer"></i>
                                        </div>
                                    </div>
                                </Link>
                                <img className='object-cover w-[446px] h-[446px]' src={`${oneMap.img}`} />
                                <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                                    <div className="flex gap-5">
                                        <button onClick={(e) => context.postlike(oneMap._id, e, index)}>
                                            <i index={index} className={`fa-regular fa-heart text-[22px] cursor-pointer ${oneMap.likes.includes(context.user) ? 'text-red-600' : ''} `} />
                                        </button>
                                        <button onClick={() => ShowCommentAdd(index)}>
                                            <i className="fa-regular fa-comment text-[22px] cursor-pointer"></i>
                                        </button>
                                        <i className="fa-solid fa-share text-[22px] cursor-pointer"></i>
                                    </div>
                                    <div className="flex">
                                        <i className="fa-regular fa-bookmark text-[22px] cursor-pointer"></i>
                                    </div>
                                </div>
                                <div className="font-semibold text-sm mx-4 mt-2 mb-4">
                                    {context.likeCount &&
                                        context.likeCount._id === oneMap._id ? context.likeCount.likes.length : oneMap.likes.length
                                    }
                                </div>
                                <div className='border-[1px] border-gray-200 px-[10px] py-[10px] flex flex-col rounded-lg m-[10px]'>
                                    <div className='flex  items-center'>
                                        <div>
                                            <img className="h-8 w-8 object-cover rounded-full" src={`${oneMap.profilePicture}`} />
                                        </div>
                                        <div className='pl-[10px]'>
                                            {oneMap.fullName}
                                        </div>
                                    </div>
                                    <div className='pl-[30px] mx-auto'>
                                        {oneMap.des}
                                    </div>
                                </div>
                                <div className={`h-[0] overflow-hidden transition-[0.5s] ${showComments === index ? 'h-[215px] overflow-visible' : 'h-[0] overflow-hidden'}`}>
                                    <div className='border-[1px] border-gray-200 flex flex-col rounded-lg m-[10px]  px-[10px] py-[10px]'>
                                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Comment</label>
                                        <textarea onChange={handleChangeinputComment} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                        <button onClick={() => handleSubmitComment(oneMap._id)} type="button" className="bg-blue-500 mt-[15px] text-white font-semibold text-[15px] py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                                        >Add Comment</button>
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