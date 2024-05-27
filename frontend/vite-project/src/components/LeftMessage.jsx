import React, { useContext } from 'react'
import { ContextInsta } from '../Context/Context'

const LeftMessage = ({ getUseReceiverId, userActive }) => {
    const context = useContext(ContextInsta)
    return (
        <div>
            <div className="flex flex-row w-96 flex-shrink-0  p-4">
                <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
                    <div className="h-full overflow-hidden relative pt-2">
                        <div className="flex flex-col divide-y h-full overflow-y-auto -mx-4">
                            {
                                context.followingProfile &&
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
                                                userActive ? <p className='text-[14px] text-green-500'>online</p> : <p className='text-[14px] text-red-500'>ofline</p>
                                            }
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftMessage