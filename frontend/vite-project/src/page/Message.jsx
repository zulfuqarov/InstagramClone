import React, { useEffect, useState, useContext } from 'react'
import LeftMessage from '../components/LeftMessage'
import RightMessage from '../components/RightMessage'
import { io } from 'socket.io-client';
import { ContextInsta } from '../Context/Context';



const Message = () => {
    const context = useContext(ContextInsta)

    const [socket, setSocket] = useState(null);
    const [messageArry, setmessageArry] = useState([])
    const [userActive, setuserActive] = useState([])

    useEffect(() => {
        context.getFollowingProfile()

        const socket = io.connect('http://localhost:8585');
        setSocket(socket);

        socket.emit('login', context.user);

        socket.on('online', (data) => {
            setuserActive(data);
        })

        socket.on('privateMessage', (senderId, message) => {
            setmessageArry(prevMessages => [...prevMessages, message]);
            console.log(`[${senderId}]: ${message}`);
        });


        return () => {
            socket.disconnect();
        };
    }, [context.user]);


    const [MessageInput, setMessageInput] = useState({
        userName: '',
        Message: ''
    })
    const handleChangeMessage = (e) => {
        setMessageInput({
            ...MessageInput,
            Message: e.target.value
        })
    }


    const [UseReceiverId, setUseReceiverId] = useState('')
    const [userMessagingProfile, setuserMessagingProfile] = useState(null)
    const getUseReceiverId = (id, user) => {
        setUseReceiverId(id)
        setuserMessagingProfile(user)
    }


    const SendMessage = () => {
        if (socket) {
            socket.emit('privateMessage', context.user, UseReceiverId, MessageInput.Message);
        } else {
            console.error('Soket bağlantısı bulunamadı.');
        }
    }
    return (
        <div class="flex flex-row h-screen antialiased text-gray-800">
            <LeftMessage userActive={userActive} getUseReceiverId={getUseReceiverId} />
            <RightMessage userMessagingProfile={userMessagingProfile} message={messageArry} SendMessage={SendMessage} handleChangeMessage={handleChangeMessage} />
        </div>
    )
}

export default Message