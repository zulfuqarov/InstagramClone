import React, { useContext, useEffect } from 'react'
import { ContextInsta } from '../Context/Context'
import axios from 'axios'
import { toast } from 'react-toastify'
const Post = () => {
  const context = useContext(ContextInsta)

  useEffect(() => {
    context.getUserPost()
  }, [])

  const DeletePost = async (id) => {
    try {
      const res = await axios.delete(`${context.REACT_APP_BACKEND_HOST}/post/DeletePost/${id}`)
      console.log(res.data)
      toast.success(`${res.data.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  if (context.userPost.length > 0) {
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
                <img className='rounded-md w-full h-full object-cover' src={`${oneMap.img}`} alt="" />
                <div className='opacity-0 z-10  dden group-hover:opacity-40 transition-all absolute top-0 left-0 w-full h-full bg-slate-900 	'>

                </div>
                <div className='opacity-0 group-hover:opacity-100 transition-all   text-white z-20  absolute top-0 left-0 flex justify-center items-center w-full h-full'>
                  <i className="fa-solid fa-heart "><span className='text-[14px] pl-[7px] inline-block'>{oneMap.likes.length}</span></i>
                  <i className="fa-solid fa-comment pl-[20px]"><span className='text-[14px] pl-[7px] inline-block'>{oneMap.comments.length}</span></i>
                </div>
                <button onClick={() => DeletePost(oneMap._id)} className='text-red-600 group-hover:scale-100 transition-all text-[15px] z-30 scale-0 absolute bottom-0 font-semibold right-[15px] hover:text-white'>Delete Post</button>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Post