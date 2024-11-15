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
    const [showComments, setshowComments] = useState()
    const ShowCommentAdd = (index, receiverId) => {
        setshowComments(index)
        getPostComment(receiverId)
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
                                        <div className={`h-[0] overflow-hidden transition-[0.5s] ${showComments === index ? 'h-[100%] overflow-visible' : 'h-[0] overflow-hidden'}`}>
                                            {loading ?
                                                <div role="status" className='flex justify-center items-center'>
                                                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                                :
                                                getComment &&
                                                getComment.map((oneMap, index) => (
                                                    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                                        <footer className="flex justify-between items-center mb-2">
                                                            <div className="flex items-center">
                                                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                                                    className="mr-2 w-6 h-6 rounded-full object-cover"
                                                                    src={`${oneMap.profilePicture}`}
                                                                    alt="Michael Gough" />{oneMap.fullName}</p>

                                                            </div>
                                                            <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                                type="button">
                                                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                                </svg>
                                                                <span className="sr-only">Comment settings</span>
                                                            </button>
                                                            <div id="dropdownComment1"
                                                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                                                    <li>
                                                                        <a href="#"
                                                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#"
                                                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#"
                                                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </footer>
                                                        <p className="text-gray-500 dark:text-gray-400">{oneMap.content}</p>
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