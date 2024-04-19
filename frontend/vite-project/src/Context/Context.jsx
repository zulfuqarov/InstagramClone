import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const env = import.meta.env

export const ContextInsta = createContext()

const Context = ({ children }) => {
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [loadingHome, setloadingHome] = useState(true)



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
            const result = await axios.post(`${env.REACT_APP_BACKEND_HOST}/auth/Sign/`, inputs)
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

    // -----------

    // Check Token start
    const checkToken = async () => {
        try {
            const result = await axios.get(`${env.REACT_APP_BACKEND_HOST}/auth/Profile/`)
            if (result.status === 200) {
                setloadingHome(false)
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
    return (
        <ContextInsta.Provider value={{
            env,
            handleChange,
            handleSubmitSign,
            loading,
            loadingHome,
            checkToken
        }}>
            {children}
        </ContextInsta.Provider>
    )
}

export default Context