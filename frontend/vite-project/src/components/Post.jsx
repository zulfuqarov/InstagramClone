import React, { useContext, useEffect } from 'react'
import { ContextInsta } from '../Context/Context'

const Post = () => {
  const context = useContext(ContextInsta)

  useEffect(() => {
    context.getUserPost()
  }, [])

  return (
    <div className='pt-[100px]'>
      <div>
        <p className='text-center text-[22px] border-b-[2px] pb-[5px]'><i className="fa-solid fa-signs-post pr-[10px]"></i>Post</p>
      </div>
      <div className='grid grid-cols-3 gap-4 pt-[20px] '>
        {
          context.userPost &&
          context.userPost.map((oneMap, index) => (
            <div key={index} className='relative group' /*onMouseEnter={() => context.getPostComments(oneMap._id)}*/>
              <img className='rounded-md w-full h-full' src={`${oneMap.img}`} alt="" />
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
  )
}

export default Post