import React, { useEffect, useState, useContext } from 'react'
import { ContextInsta } from '../Context/Context'

const RightMessage = ({ handleChangeMessage, SendMessage, message, userMessagingProfile, MessageInput, senderUserMessage, messageLoading, dbMessage, loading }) => {

    const context = useContext(ContextInsta)

    const [messageArry, setMessageArry] = useState([])
    useEffect(() => {
        setMessageArry([...senderUserMessage, ...message])
    }, [senderUserMessage, message])


    return (
        <div className="flex flex-col h-full w-full bg-white px-4 py-6">
            <div>
                {
                    userMessagingProfile &&
                    <div className="flex flex-row  items-center p-4 ">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                            <img className='w-full h-full object-cover rounded-full' src={`${userMessagingProfile.profilePicture}`} alt="" />
                        </div>
                        <div className="flex flex-col flex-grow ml-3">
                            <div className="text-sm font-medium">{userMessagingProfile.fullName}</div>
                            <div className="text-xs truncate w-40">{userMessagingProfile.bio}</div>
                        </div>
                    </div>
                }
            </div>
            {
                loading ?

                    <div className='h-full overflow-hidden py-4 justify-center items-center' role="status">
                        <svg aria-hidden="true" className="w-8 h-full m-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>

                    :
                    <div className="h-full overflow-hidden py-4">
                        <div className="h-full overflow-y-auto">
                            <div className="grid grid-cols-12 gap-y-2">
                                {
                                    dbMessage &&
                                    dbMessage.map((oneMap, index) => (
                                        <div key={index} className={oneMap.sender === context.user ? 'col-start-6 col-end-13 p-3 rounded-lg ' : 'col-start-1 col-end-8 p-3 rounded-lg'}>
                                            <div className="flex flex-row items-center relative">
                                                <div
                                                    className="flex items-center justify-center h-10 w-10 rounded-full  flex-shrink-0"
                                                >
                                                    {
                                                        oneMap.sender === context.user ?

                                                            context.userProfile &&
                                                            <img className="h-8 w-8 object-cover  rounded-full" src={`${context.userProfile.profilePicture}`} />

                                                            :
                                                            userMessagingProfile &&
                                                            <img className="h-8 w-8 object-cover  rounded-full" src={`${userMessagingProfile.profilePicture}`} />
                                                    }
                                                </div>
                                                <div
                                                    className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>
                                                        {oneMap.message}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }


                                {
                                    messageArry && messageArry.sort((a, b) => new Date(a.date) - new Date(b.date)).map((oneMap, index) => (
                                        <div key={index} className={oneMap.senderId === context.user ? 'col-start-6 col-end-13 p-3 rounded-lg ' : 'col-start-1 col-end-8 p-3 rounded-lg'}>
                                            {
                                                oneMap.senderId === context.user ?
                                                    <div className="flex flex-row items-center relative">
                                                        <div
                                                            className="flex items-center justify-center h-10 w-10 rounded-full  flex-shrink-0"
                                                        >
                                                            {
                                                                context.userProfile &&
                                                                <img className="h-8 w-8 object-cover  rounded-full" src={`${context.userProfile.profilePicture}`} />

                                                            }                                                        </div>
                                                        <div
                                                            className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                        >
                                                            <div>
                                                                {oneMap.message}
                                                            </div>
                                                        </div>
                                                        {messageLoading.includes(oneMap.message) ? <i className="text-[12px] absolute bottom-0 right-0 text-green-500 fa-solid fa-check"></i> : <i class="text-[12px] absolute bottom-0 right-0 text-red-500 fa-solid fa-xmark"></i>}
                                                    </div> : ''
                                            }
                                            {
                                                oneMap.UseReceiverId === userMessagingProfile._id ?
                                                    <div className="flex flex-row items-center">
                                                        <div
                                                            className="flex items-center justify-center h-10 w-10 rounded-full  flex-shrink-0"
                                                        >

                                                            <img className="h-8 w-8 object-cover  rounded-full" src={`${userMessagingProfile.profilePicture}`} />
                                                        </div>
                                                        <div
                                                            className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                        >
                                                            <div>
                                                                {oneMap.message}
                                                            </div>
                                                        </div>
                                                    </div> : ''
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
            }
            <div className="flex flex-row items-center">
                <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
                    <div className="w-full">
                        <input type="text"
                            value={MessageInput.Message}
                            onChange={handleChangeMessage}
                            className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center" placeholder="Type your message...." />
                    </div>
                </div>
                <div className="ml-6">
                    <button onClick={SendMessage} className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 ">
                        <svg className="w-5 h-5 transform rotate-90 -mr-px"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RightMessage