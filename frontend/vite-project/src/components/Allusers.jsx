import React, { useContext, useEffect } from 'react'
import { ContextInsta } from '../Context/Context'

const Allusers = () => {
    const context = useContext(ContextInsta)
    useEffect(() => {
        context.getUserProfile()
    }, [])
    return (
        <div className="flex flex-row w-96 flex-shrink-0  p-4">
            <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
                <div className="h-full overflow-hidden relative pt-2">
                    <div className="flex flex-col divide-y h-full overflow-y-auto -mx-4">
                        {
                            context.searchProfile.length > 0 ?
                                context.searchProfile.map((oneMap, index) => (
                                    <div key={index} className="flex flex-row items-center p-4 ">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-full  text-black font-bold flex-shrink-0">
                                            <img className='h-8 w-8 object-cover rounded-full' src={`${oneMap.profilePicture}`} alt='noe img' />

                                        </div>
                                        <div className="flex flex-col flex-grow ml-3">
                                            <div className="text-sm font-medium">{oneMap.fullName}</div>
                                            <div className="text-xs truncate w-40">{oneMap.bio}</div>
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
                                )) : context.allUserProfile &&
                                context.allUserProfile.filter(oneFilter => oneFilter._id !== context.user).reverse().map((oneMap, index) => (
                                    <div key={index} className="flex flex-row items-center p-4 ">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-full  text-black font-bold flex-shrink-0">
                                            <img className='h-8 w-8 object-cover rounded-full' src={`${oneMap.profilePicture}`} alt='noe img' />
                                        </div>
                                        <div className="flex flex-col flex-grow ml-3">
                                            <div className="text-sm font-medium">{oneMap.fullName}</div>
                                            <div className="text-xs truncate w-40">{oneMap.bio}</div>
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
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Allusers