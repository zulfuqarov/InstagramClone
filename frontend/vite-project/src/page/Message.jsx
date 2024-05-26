import React, { useEffect, useState, useContext } from 'react'
import LeftMessage from '../components/LeftMessage'
import RightMessage from '../components/RightMessage'
import { io } from 'socket.io-client';
import { ContextInsta } from '../Context/Context';



const Message = () => {
    const context = useContext(ContextInsta)

    const [socket, setSocket] = useState(null);
    useEffect(() => {
        context.getFollowingProfile()
        const socket = io.connect('http://localhost:8585');
        socket.emit('login', context.user);
        setSocket(socket);
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

    const SendMessage = () => {
        if (socket) {
            // socket.emit("SendMessage", MessageInput);
            socket.emit('privateMessage', context.user, "664f2e5b637e61f54fb92a23", MessageInput.Message);
            socket.on('privateMessage', (senderId, message) => {
                console.log(`[${senderId}]: ${message}`);
            });
        } else {
            console.error('Soket bağlantısı bulunamadı.');
        }
    }



    return (
        <div class="flex flex-row h-screen antialiased text-gray-800">
            <LeftMessage />
            <RightMessage SendMessage={SendMessage} handleChangeMessage={handleChangeMessage} />
        </div>
    )
}

export default Message