import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const App = () => {

  const [yazisma, setyazisma] = useState("")
  const [gelencvb, setgelencvb] = useState([null])
  const [socket, setsocket] = useState(null)
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

    newSocket.on('gonderilenMesaj', (data) => {
      if (gelencvb !== null) {
        setgelencvb((prev) => (
          [...prev, data]
        ))
      } else {
        setgelencvb([data])
      }
      console.log(gelencvb)
    })
    // ComponentWillUnmount'da soket bağlantısını kapat
    return () => {
      newSocket.disconnect();
    };
  }, [])

  return (
    <div>
      {
        gelencvb &&
        gelencvb.map((oneMap, index) => (
          <p key={index}>{oneMap}</p>
        ))
      }
      <h1>Socket.io React App</h1>
      <input value={yazisma} onChange={changeInput} type="text" />
      <button onClick={gonder}>gonder</button>
    </div>
  ); 
};

export default App;
