import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

// env start
const env = import.meta.env
const { REACT_APP_BACKEND_HOST } = env
// env stop
export const ContextInsta = createContext()

const Context = ({ children }) => {

    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [loadingHome, setloadingHome] = useState(true)
    const [user, setuser] = useState(null)


    // Sign start
    const [inputs, setinputs] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setinputs(
            {
                ...inputs,
                [e.target.name]: e.target.value
            }
        )
    }
    const handleSubmitSign = async () => {
        setloading(true)
        try {
            const result = await axios.post(`${REACT_APP_BACKEND_HOST}/auth/Sign/`, inputs)
            console.log(result.data.message)
            toast.success('Sign with successful', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/')
            setloading(false)
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
            setloading(false)
        }
    }
    // Sign end


    // Check Token start
    const checkToken = async () => {
        try {
            const result = await axios.get(`${REACT_APP_BACKEND_HOST}/auth/Profile/`)
            if (result.status === 200) {
                // setloadingHome(false)
                setuser(result.data.user)
                console.log(result.data)
            }
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
            // setloadingHome(false)
            navigate("/login")
        }
    }
    // Check Token end


    // Signout start
    const signOut = async () => {
        try {
            const res = await axios.post(`${REACT_APP_BACKEND_HOST}/auth/Logout`)
            console.log(res)
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
    // Signout end


    // get User Post start
    const [userPost, setuserPost] = useState([])
    const getUserPost = async () => {
        try {
            const result = await axios.get(`${REACT_APP_BACKEND_HOST}/post/GetUserPost`)
            console.log(result.data)
            setuserPost(result.data)
        } catch (error) {
            console.log(error)
            alert(`${error.response.data.message}`)
        }
    }
    // get User Post end


    // get userProfile start
    const [userProfile, setuserProfile] = useState(null)
    const getUserProfile = async () => {
        try {
            const res = await axios.get(`${REACT_APP_BACKEND_HOST}/user/ProfileUser?userId=${user}`)
            console.log(res.data)
            setuserProfile(res.data)
            setloadingHome(false)
        } catch (error) {
            console.log(error)
            setloadingHome(false)
        }
    }
    // get userProfile end


    // get all userProfile start
    const [allUserProfile, setallUserProfile] = useState([])
    const getAllUserProfile = async () => {
        try {
            const res = await axios.get(`${REACT_APP_BACKEND_HOST}/user/AllProfile`)
            console.log(res.data)
            setallUserProfile(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    // get all userProfile end


    // get follow start
    const getFollow = async (id) => {
        try {
            const res = await axios.put(`${REACT_APP_BACKEND_HOST}/user/Follow/${id}`)
            toast.success(`${res.data}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            getUserProfile()
            console.log(res.data)
        } catch (error) {
            console.log(error)
            toast.info(`${error.response.data}`, {
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
    // get follow end


    // get Unfollow start
    const getUnfollow = async (id) => {
        try {
            const res = await axios.put(`${REACT_APP_BACKEND_HOST}/user/unFollow/${id}`)
            toast.info(`${res.data}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            getUserProfile()
        } catch (error) {
            console.log(error)
            toast.info(`${error.response.data}`, {
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
    // get Unfollow end


    // get followinf post start
    const [followingPost, setfollowingPost] = useState([])
    const getFollowingPost = async () => {
        try {
            const res = await axios.get(`${REACT_APP_BACKEND_HOST}/post/FollowingPost`)
            console.log(res.data)
            setfollowingPost(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    // get followinf post end


    // post likse start
    const [buttonIndex, setbuttonIndex] = useState(null)
    const [likeCount, setlikeCount] = useState()
    const postlike = async (id, event, index) => {
        try {
            const res = await axios.put(`${REACT_APP_BACKEND_HOST}/post/postLike/${id}`)
            console.log(res.data)
            setlikeCount(res.data.updatedPost)
            setbuttonIndex(index)
            const paragraph = event.target;
            if (paragraph) {
                if (paragraph.classList.contains('text-red-600')) {
                    paragraph.classList.remove('text-red-600');
                    paragraph.classList.add('text-gray-600');
                } else {
                    paragraph.classList.remove('text-gray-600');
                    paragraph.classList.add('text-red-600');
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    // post likse end


    // profile Search start
    const [searchProfile, setsearchProfile] = useState([])
    const profileSearch = async (SearchInput) => {
        try {
            const res = await axios.post(`${REACT_APP_BACKEND_HOST}/user/ProfileSearch`, SearchInput)
            console.log(res.data)
            setsearchProfile(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    // profile Search end


    // get follwong profile start
    const [followingProfile, setfollowingProfile] = useState([])
    const getFollowingProfile = async () => {
        try {
            const res = await axios.get(`${REACT_APP_BACKEND_HOST}/user/FollowingUser`)
            console.log(res.data)
            setfollowingProfile(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    // get follwong profile end

    

    return (
        <ContextInsta.Provider value={{
            env,
            REACT_APP_BACKEND_HOST,
            handleChange,
            handleSubmitSign,
            loading,
            loadingHome,
            checkToken,
            user,
            getUserPost,
            userPost,
            userProfile,
            getUserProfile,
            getAllUserProfile,
            allUserProfile,
            getFollow,
            getUnfollow,
            followingPost,
            getFollowingPost,
            signOut,
            postlike,
            likeCount,
            buttonIndex,
            profileSearch,
            searchProfile,
            getFollowingProfile,
            followingProfile,
        }}>
            {children}
        </ContextInsta.Provider>
    )
}

export default Context