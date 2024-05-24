import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
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
            console.log(result.data)
            navigate('/')
            setloading(false)
        } catch (error) {
            console.log(error)
            alert(`${error.response.data.message}`)
            setloading(false)
        }
    }
    // Sign end


    // Check Token start
    const checkToken = async () => {
        try {
            const result = await axios.get(`${REACT_APP_BACKEND_HOST}/auth/Profile/`)
            if (result.status === 200) {
                setloadingHome(false)
                setuser(result.data.user)
                console.log(result.data)
            }
        } catch (error) {
            console.log(error)
            alert(`${error.response.data.message}`)
            setloadingHome(false)
            navigate("/Login")
        }
    }
    // Check Token end


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
        } catch (error) {
            console.log(error)
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
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    // get follow end


    // get follow start
    const getUnfollow = async (id) => {
        try {
            const res = await axios.put(`${REACT_APP_BACKEND_HOST}/user/unFollow/${id}`)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    // get follow end


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
            getFollowingPost
        }}>
            {children}
        </ContextInsta.Provider>
    )
}

export default Context