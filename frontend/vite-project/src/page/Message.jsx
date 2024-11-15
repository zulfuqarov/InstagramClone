import React, { useEffect, useState, useContext } from 'react'
import LeftMessage from '../components/LeftMessage'
import RightMessage from '../components/RightMessage'
import { io } from 'socket.io-client';
import { ContextInsta } from '../Context/Context';
import axios from "axios"


const Message = () => {
    const context = useContext(ContextInsta)

    const [socket, setSocket] = useState(null);
    const [messageArry, setmessageArry] = useState([])
    const [userActive, setuserActive] = useState([])

    useEffect(() => {
        context.getFollowingProfile()

        context.getUserProfile()

        const socket = io.connect('http://localhost:8585');
        setSocket(socket);

        socket.emit('login', context.user);

        socket.on('online', (data) => {
            setuserActive(data);
        })

        socket.on('privateMessage', (senderId, message) => {
            setmessageArry(prevMessages => [...prevMessages, { message, date: new Date(), UseReceiverId: senderId }]);
        });

        return () => {
            socket.disconnect();
        };
    }, [context.user]);


    const [MessageInput, setMessageInput] = useState({
        Message: ''
    })
    const handleChangeMessage = (e) => {
        setMessageInput({
            Message: e.target.value
        })
    }

    const [UseReceiverId, setUseReceiverId] = useState('')
    const [userMessagingProfile, setuserMessagingProfile] = useState(null)
    const getUseReceiverId = (id, user) => {
        setUseReceiverId(id)
        setuserMessagingProfile(user)
    }

    const [messageLoading, setmessageLoading] = useState([])
    const postMessageDb = async () => {
        try {
            const res = await axios.post(`${context.REACT_APP_BACKEND_HOST}/message/messages/${UseReceiverId}`, {
                messageContent: MessageInput.Message
            })
            if (res.status === 201) {
                console.log(res.data)
                setmessageLoading(prev => [...prev, res.data.message])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [senderUserMessage, setsenderUserMessage] = useState([])
    const SendMessage = async () => {
        try {
            await postMessageDb()
            setsenderUserMessage((prev) => [...prev, { message: MessageInput.Message, date: new Date(), senderId: context.user }])
            if (socket) {
                socket.emit('privateMessage', context.user, UseReceiverId, MessageInput.Message);
                setMessageInput({
                    Message: ''
                })
            } else {
                console.error('Soket bağlantısı bulunamadı.');
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [dbMessage, setdbMessage] = useState([])
    const [loading, setloading] = useState(false)
    const getMessageDb = async () => {
        setloading(true)
        try {
            const res = await axios.get(`${context.REACT_APP_BACKEND_HOST}/message/messages/${UseReceiverId}`)
            setdbMessage(res.data)
            setloading(false)
        } catch (error) {
            setloading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        setsenderUserMessage([])
        setmessageArry([])
        setmessageLoading([])
        getMessageDb()
    }, [userMessagingProfile])

    return (
        <div class="flex flex-row h-screen w-full justify-between antialiased text-gray-800">
            <LeftMessage userActive={userActive} getUseReceiverId={getUseReceiverId} />
            {
                userMessagingProfile === null ? <p className='flex flex-col w-full h-full justify-center items-center text-red-500 text-[15px]'>Could you please select the person you'd like to message?</p> :
                    <RightMessage loading={loading} dbMessage={dbMessage} messageLoading={messageLoading} senderUserMessage={senderUserMessage} MessageInput={MessageInput} userMessagingProfile={userMessagingProfile} message={messageArry} SendMessage={SendMessage} handleChangeMessage={handleChangeMessage} />
            }
        </div>
    )
}

export default Message