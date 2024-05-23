import React, { useState, useContext } from 'react';
import { ContextInsta } from '../Context/Context';
import axios from 'axios'
const AddPost = () => {

  const context = useContext(ContextInsta)


  const [selectedImage, setSelectedImage] = useState(null);
  const [postImg, setpostImg] = useState(null)
  const [description, setdescription] = useState('')

  const handleImageChange = (event) => {
    if (!event.target.files[0]) {
      return;
    }
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setSelectedImage(imageUrl);
    setpostImg(imageFile)
  };


  const AddPost = async () => {
    if (postImg == null || description == '') {
      alert('Pls Check Form')
    } else {
      try {
        const formData = new FormData();
        formData.append("postPicture", postImg);
        formData.append("des", description);
        formData.append("userId", context.user);
        const res = await axios.post(`${context.REACT_APP_BACKEND_HOST}/post/`, formData)
        console.log(res.data)
        alert(`${res.data}`)
        setpostImg(null)
        setSelectedImage(null)
        setdescription('')
      } catch (error) {
        console.log(error.response.data.message)
      }
    }
  }

  return (
    <div className="bg-white shadow-md rounded-md p-4 max-w-md mx-auto pt-[80px]">
      <h2 className="text-lg font-semibold mb-2 text-center">Add a New Post</h2>

      <textarea
        value={description}
        onChange={(e) => setdescription(e.target.value)}
        className="w-full h-24 p-2 mb-4 border rounded-md focus:outline-none mt-[20px] focus:border-blue-500"
        placeholder="Post Description"
      ></textarea>

      <div className=" flex items-center justify-center bg-gray-100">
        <label htmlFor="fileInput" className="relative w-72 h-72 overflow-hidden rounded-lg border-4 border-dashed border-gray-300 cursor-pointer">
          {selectedImage ? (
            <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
              <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span className="text-sm">Drag & drop or click to upload</span>
            </div>
          )}
          <input
            id="fileInput"
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>

      <button
        onClick={AddPost}
        className="bg-blue-500 mt-[30px] text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Add Post
      </button>

    </div>
  )
}

export default AddPost