import React, { useEffect, useContext, useState } from 'react'
import UserProfile from './UserProfile'
import { ContextInsta } from '../Context/Context'
import { Link } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify';
const HomeIndex = () => {

    const context = useContext(ContextInsta)

    useEffect(() => {
        context.getFollowingPost()
    }, [])

    const [getComment, setgetComment] = useState([])
    const [loading, setLoading] = useState(false)
    const getPostComment = async (receiverId) => {
        setLoading(true)
        try {
            const res = await axios.get(`${context.REACT_APP_BACKEND_HOST}/postComment?receiverId=${receiverId}`)
            setgetComment(res.data)
            console.log(res.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [showComments, setshowComments] = useState({
        index: null,
        show: false
    })
    const ShowCommentAdd = (index, receiverId) => {
        setshowComments({
            index: index,
            show: !showComments.show
        })
        getPostComment(receiverId)
    }

    const [showCommentsOptions, setshowCommentsOptions] = useState({
        index: null,
        show: false
    })
    const handleOptions = (index) => {
        setshowCommentsOptions({
            index: index,
            show: !showCommentsOptions.show
        })
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
            toast.success(`Comment successfuly`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setgetComment([...getComment, res.data])
        } catch (error) {
            toast.error(`Comment error`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(error)
        }
    }

    const deleteCommentHandler = async (commentId, postId) => {
        try {
            const response = await axios.delete(`${context.REACT_APP_BACKEND_HOST}/postComment?postId=${postId}&id=${commentId}`)
            toast.success(`${response.data}`)
            getPostComment(postId)
        } catch (error) {
            console.log(error)
            toast.error(`${error.response.data.message}`)
        }
    }

    return (
        <div className='flex w-full justify-evenly relative'>
            <div className='w-[50%]'>
                {
                    context.userProfile &&
                        context.userProfile.followings.length > 0 ?

                        context.followingPost.length > 0 ?
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
                                                <button onClick={() => ShowCommentAdd(index, oneMap._id)}>
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
                                        <div className={`h-[0] overflow-hidden transition-[0.5s] ${showComments.index === index && showComments.show ? 'h-[100%] overflow-visible' : 'h-[0] overflow-hidden'}`}>
                                            {
                                                getComment &&
                                                getComment.map((oneMapComment, index) => (
                                                    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 relative">
                                                        <footer className="flex justify-between items-center min-h-[60px] mb-2">
                                                            <div className="flex items-center">
                                                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                                                    className="mr-2 w-6 h-6 rounded-full object-cover"
                                                                    src={`${oneMapComment.profilePicture}`}
                                                                    alt="Michael Gough" />{oneMapComment.fullName}</p>

                                                            </div>
                                                            {
                                                                oneMapComment.senderId === context.userProfile._id &&
                                                                <div>
                                                                    <button
                                                                        onClick={() => handleOptions(index)}
                                                                        id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                                                        className="inline-flex  items-center  text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                                        type="button">
                                                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                                        </svg>
                                                                    </button>
                                                                    {
                                                                        showCommentsOptions.index === index && showCommentsOptions.show &&
                                                                        <div
                                                                            className=" absolute rounded bottom-[25px] right-0 z-10 w-36 bg-gray-200  divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                                            <ul className=" text-sm rounded text-gray-700 dark:text-gray-200"
                                                                                aria-labelledby="dropdownMenuIconHorizontalButton">

                                                                                <li className='w-full rounded'>
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            deleteCommentHandler(oneMapComment._id, oneMap._id)
                                                                                        }}
                                                                                        className="block rounded py-2 px-4 w-full font-bold hover:bg-red-400 dark:hover:bg-gray-600 dark:hover:text-white transition-all">Remove</button>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    }

                                                                </div>
                                                            }
                                                        </footer>
                                                        <p className="text-gray-500 dark:text-gray-400">{oneMapComment.content}</p>
                                                    </article>
                                                ))
                                            }

                                            <div className='border-[1px] border-gray-200 flex flex-col rounded-lg m-[10px]  px-[10px] py-[10px]'>
                                                <label for="message" classname="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Comment</label>
                                                <textarea onChange={handleChangeinputComment} id="message" rows="4" classname="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                                <button onClick={() => handleSubmitComment(oneMap._id)} type="button" className="bg-blue-500 mt-[15px] text-white font-semibold text-[15px] py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                                                >Add Comment</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) :

                            <div className="flex flex-col items-center justify-center h-screen">
                                <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 text-center max-w-md mx-auto">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                        Your friends haven't shared anything yet.
                                    </h1>
                                </div>
                            </div>


                        :

                        <div className="flex flex-col items-center justify-center h-screen">
                            <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 text-center max-w-md mx-auto">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                    Your Friends list is Empty.
                                </h1>
                                <p className="text-gray-600 mb-6">
                                    Please follow someone to get started!
                                </p>
                                <div className="flex justify-center gap-4">
                                    <Link
                                        to="Search"
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
                                        Find Friends
                                    </Link>
                                </div>
                            </div>
                        </div>

                }



            </div>
            <div className='w-[20%]'>
                <UserProfile />
            </div>

        </div>
    )
}

export default HomeIndex