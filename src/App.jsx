import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from "axios"
const App = () => {

  const [yazisma, setyazisma] = useState("")
  const [gelencvb, setgelencvb] = useState([null])
  const [socket, setsocket] = useState(null)

  const [MesajBack, setMesajBack] = useState([])

  const changeInput = (e) => {
    setyazisma(e.target.value)
  }

  const gonder = () => {
    if (!socket) return;

    socket.emit("alinanMesaj", {
      mesaj: yazisma
    })

    setyazisma("")
  }

  useEffect(() => {
    const newSocket = io('http://localhost:8585');
    setsocket(newSocket);

    const MesajlariGetirBack = async () => {
      try {
        const getir = await axios.get("http://localhost:8585/api/message/messages/660d81d8272b224108541196", {
          headers: {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjA4ZTY0MTg0N2JmM2VkYmIzNzA2NTEiLCJpYXQiOjE3MTIyODA0ODYsImV4cCI6MTcxMjUzOTY4Nn0.Sm1gSkVhVs0g7M0hXS1xn6Jepyy0svdOIv3b8JdCAR0"
          }
        })
        // console.log(getir.data)
        setMesajBack(getir.data)
      } catch (error) {
        console.log(error)
      }
    }
    // MesajlariGetirBack()

    const socketAsync = () => {
      newSocket.on('gonderilenMesaj', (data) => {
        const MesajlarGonderBack = async () => {
          try {
            const getir = await axios.post("http://localhost:8585/api/message/messages/660d81d8272b224108541196", {
              messageContent: data,
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjA4ZTY0MTg0N2JmM2VkYmIzNzA2NTEiLCJpYXQiOjE3MTIyODE5OTksImV4cCI6MTcxMjU0MTE5OX0.FWJPSYPm80nEKtwJywmf_i6t9SRZoxt-YgSGF1I7oms"
            })

            setMesajBack((prev) => (
              [...prev, { message: data }]
            ))
          } catch (error) {
            console.log(error)
          }
        }
        MesajlarGonderBack()

      })
    }

    const useEffectasync = async () => {
      await MesajlariGetirBack()
      socketAsync()
    }
    useEffectasync()
    return () => {
      newSocket.disconnect();
    };

  }, [])



  return (
    <div>
      {
        MesajBack &&
        MesajBack.map((oneMap, index) => (
          <p key={index}>{oneMap.message}</p>
        ))
        // gelencvb &&
        // gelencvb.map((oneMap, index) => (
        //   <p key={index}>{oneMap}</p>
        // ))
      }
      <h1>Socket.io React App</h1>
      <input value={yazisma} onChange={changeInput} type="text" />
      <button onClick={gonder}>gonder</button>
    </div>
  );
};

export default App;
