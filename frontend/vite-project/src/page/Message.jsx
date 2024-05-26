import React, { useEffect, useState, useContext } from 'react'
import LeftMessage from '../components/LeftMessage'
import RightMessage from '../components/RightMessage'
import { io } from 'socket.io-client';
import { ContextInsta } from '../Context/Context';



const Message = () => {
    const context = useContext(ContextInsta)

    const [socket, setSocket] = useState(null);
    const [messageArry, setmessageArry] = useState([])

    useEffect(() => {
        context.getFollowingProfile()

        const socket = io.connect('http://localhost:8585');
        setSocket(socket);

        socket.emit('login', context.user);

        socket.on('privateMessage', (senderId, message) => {
            setmessageArry(prevMessages => [...prevMessages, message]);
            console.log(`[${senderId}]: ${message}`);
        });


        return () => {
            socket.disconnect();
        };
    }, []);


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
    const getUseReceiverId = (id) => {
        setUseReceiverId(id)
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
            <LeftMessage getUseReceiverId={getUseReceiverId} />
            <RightMessage message={messageArry} SendMessage={SendMessage} handleChangeMessage={handleChangeMessage} />
        </div>
    )
}

export default Message