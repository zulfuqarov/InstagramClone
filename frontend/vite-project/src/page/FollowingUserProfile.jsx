import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ContextInsta } from '../Context/Context'
import { useParams } from 'react-router-dom'
const FollowingUserProfile = () => {
    const { userName } = useParams()
    const context = useContext(ContextInsta)


    const [userProfile, setuserProfile] = useState()
    const getUserProfile = async () => {
        try {
            const resProfile = await axios.get(`${context.REACT_APP_BACKEND_HOST}/user/ProfileUser?username=${userName}`)
            console.log(resProfile.data)
            setuserProfile(resProfile.data)
            const resPost = await axios.get(`${context.REACT_APP_BACKEND_HOST}/post/GetPost/${resProfile.data._id}`)
            console.log(resPost.data)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getUserProfile()
    }, [])

    return (
        <div>FollowingUserProfile</div>
    )
}

export default FollowingUserProfile