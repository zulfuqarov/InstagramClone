import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const App = () => {

  const [yazisma, setyazisma] = useState("")
  const [gelencvb, setgelencvb] = useState([])

  const changeInput = (e) => {
    setyazisma(e.target.value)
  }

  const gonder = () => {
    const socket = io('http://localhost:8585'); // Sunucu adresini ve portunu doğru şekilde ayarlayın
    socket.emit("alinanMesaj", {
      mesaj: yazisma
    })
    socket.on('gonderilenMesaj', (data) => {
      console.log(setgelencvb([...gelencvb, data]));
    })
    setyazisma("")
  }



  return (
    <div>
      {
        gelencvb &&
        gelencvb.map((oneMap) => (
          <p>{oneMap}</p>
        ))
      }
      <h1>Socket.io React App</h1>
      <input value={yazisma} onChange={changeInput} type="text" />
      <button onClick={gonder}>gonder</button>
    </div>
  );
};

export default App;
