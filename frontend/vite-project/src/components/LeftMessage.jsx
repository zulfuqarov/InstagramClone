import React, { useContext } from 'react'
import { ContextInsta } from '../Context/Context'
import { Link } from 'react-router-dom'
const LeftMessage = ({ getUseReceiverId, userActive }) => {
    const context = useContext(ContextInsta)
    return (
        <div>
            <div className="flex flex-row w-96 flex-shrink-0  p-4">
                <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
                    <div className="h-full overflow-hidden relative pt-2">
                        <div className="flex flex-col divide-y h-full overflow-y-auto -mx-4">
                            {
                                context.userProfile &&
                                    context.userProfile.followings.length > 0 ?
                                    context.followingProfile.map((oneMap, index) => (
                                        <button key={index} onClick={() => getUseReceiverId(oneMap._id, oneMap)} className='flex items-center'>
                                            <div className="flex flex-row  items-center p-4 ">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                                                    <img className='w-full h-full object-cover rounded-full' src={`${oneMap.profilePicture}`} alt="" />
                                                </div>
                                                <div className="flex flex-col flex-grow ml-3">
                                                    <div className="text-sm font-medium">{oneMap.fullName}</div>
                                                    <div className="text-xs truncate w-40">{oneMap.bio}</div>
                                                </div>
                                            </div>
                                            <div>
                                                {


                                                    userActive &&
                                                        userActive.includes(oneMap._id) ? <p className='text-[14px] text-green-500'>online</p> : <p className='text-[14px] text-red-500'>ofline</p>
                                                }
                                            </div>
                                        </button>
                                    )) :
                                    <div className="flex flex-col items-center justify-center ">
                                        <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 text-center max-w-md mx-auto">
                                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                                Your Friends list is Empty.
                                            </h1>
                                            <p className="text-gray-600 mb-6">
                                                Please follow someone to get started!
                                            </p>
                                            <div className="flex justify-center gap-4">
                                                <Link
                                                    to="/Search"
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
                                                    Find Friends
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftMessage